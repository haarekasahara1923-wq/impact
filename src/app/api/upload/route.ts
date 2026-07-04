import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Helper: generate Cloudinary signature manually using crypto
function generateSignature(params: Record<string, string>, apiSecret: string): string {
  // Sort params alphabetically and build the signing string
  const sortedKeys = Object.keys(params).sort();
  const stringToSign = sortedKeys
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return crypto
    .createHash('sha1')
    .update(stringToSign + apiSecret)
    .digest('hex');
}

export async function POST(req: Request) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { success: false, error: 'Cloudinary credentials are not configured in environment variables.' },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Detect resource type
    const isVideo = file.type.startsWith('video/');
    const resourceType = isVideo ? 'video' : 'image';

    // Build signature params — must match exactly what we send to Cloudinary
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const folder = 'impact-institute';

    const sigParams: Record<string, string> = {
      folder,
      timestamp,
    };

    const signature = generateSignature(sigParams, apiSecret);

    // Build the multipart form for Cloudinary REST API
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('api_key', apiKey);
    cloudinaryFormData.append('timestamp', timestamp);
    cloudinaryFormData.append('folder', folder);
    cloudinaryFormData.append('signature', signature);

    // POST directly to Cloudinary REST API
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
    const cloudinaryRes = await fetch(uploadUrl, {
      method: 'POST',
      body: cloudinaryFormData,
    });

    const result = await cloudinaryRes.json();

    if (!cloudinaryRes.ok) {
      console.error('Cloudinary API error:', result);
      return NextResponse.json(
        { success: false, error: result?.error?.message || 'Cloudinary upload failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      mediaType: resourceType,
      publicId: result.public_id,
    });
  } catch (error: any) {
    console.error('Upload route error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
