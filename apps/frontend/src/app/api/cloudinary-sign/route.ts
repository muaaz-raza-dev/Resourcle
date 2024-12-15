import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.v2.utils.api_sign_request(
    { timestamp, upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET },
    process.env.CLOUDINARY_API_SECRET
  );

  return NextResponse.json({ signature, timestamp });
}