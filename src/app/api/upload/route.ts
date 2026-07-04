import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { success: false, error: 'Cloudinary credentials are not configured.' },
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

    // Generate signature — MUST sort params alphabetically and append API_SECRET at end
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const folder = 'impact-institute';

    const paramsToSign: Record<string, string> = { folder, timestamp };
    const sortedKeys = Object.keys(paramsToSign).sort();
    const stringToSign =
      sortedKeys.map((k) => `${k}=${paramsToSign[k]}`).join('&') + apiSecret.trim();

    const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');

    // Build FormData for Cloudinary REST API (signed upload)
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('api_key', apiKey.trim());
    cloudinaryFormData.append('timestamp', timestamp);
    cloudinaryFormData.append('folder', folder);
    cloudinaryFormData.append('signature', signature);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName.trim()}/${resourceType}/upload`;

    const cloudinaryRes = await fetch(uploadUrl, {
      method: 'POST',
      body: cloudinaryFormData,
    });

    const result = await cloudinaryRes.json();

    if (!cloudinaryRes.ok) {
      console.error('Cloudinary upload error:', JSON.stringify(result));
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
