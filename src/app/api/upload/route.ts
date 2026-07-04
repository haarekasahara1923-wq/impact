import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || 'impact_upload';

    if (!cloudName || cloudName === 'your_cloud_name') {
      return NextResponse.json(
        { success: false, error: 'CLOUDINARY_CLOUD_NAME is not configured in environment variables.' },
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

    // Build FormData for Cloudinary unsigned upload — NO signature needed
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('upload_preset', uploadPreset);   // unsigned preset
    cloudinaryFormData.append('folder', 'impact-institute');

    // POST directly to Cloudinary REST API (unsigned)
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const cloudinaryRes = await fetch(uploadUrl, {
      method: 'POST',
      body: cloudinaryFormData,
    });

    const result = await cloudinaryRes.json();

    if (!cloudinaryRes.ok) {
      console.error('Cloudinary API error:', JSON.stringify(result));
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
