import { apiJson } from './apiClient';
import { Media, MediaType } from '../types/media';

interface UploadMediaOptions {
  file: File;
  type: MediaType;
  token: string;
  caption?: string;
  tripId?: string;
}

export function isVideoUrl(url: string): boolean {
  return url.includes('/video/upload/') || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(url);
}

export async function uploadMedia({
  file,
  type,
  token,
  caption,
  tripId,
}: UploadMediaOptions): Promise<Media> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  if (caption) formData.append('caption', caption);
  if (tripId) formData.append('tripId', tripId);

  const { ok, data } = await apiJson<{ message?: string; media: Media }>('/api/media-uploads', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!ok) throw new Error(data.message ?? 'Upload failed');
  return data.media;
}

export function detectMediaType(file: File): MediaType {
  return file.type.startsWith('video/') ? 'video' : 'image';
}
