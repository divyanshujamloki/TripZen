'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { ImagePlus, Loader2, Video } from 'lucide-react';
import { detectMediaType, isVideoUrl, uploadMedia } from '../../lib/mediaUpload';
import Button from '../ui/Button';

interface CoverImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  tripId?: string;
}

const MAX_BYTES = 50 * 1024 * 1024;

export default function CoverImageUpload({ value, onChange, tripId }: CoverImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [previewType, setPreviewType] = useState<'image' | 'video' | null>(
    value ? (isVideoUrl(value) ? 'video' : 'image') : null
  );

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (file.size > MAX_BYTES) {
      setError('File must be 50MB or smaller');
      return;
    }

    const token = localStorage.getItem('tripzen_token');
    if (!token) {
      setError('Please sign in as admin');
      return;
    }

    const type = detectMediaType(file);
    setUploading(true);
    setError('');

    try {
      const media = await uploadMedia({
        file,
        type,
        token,
        caption: 'Trip cover',
        tripId,
      });
      onChange(media.url);
      setPreviewType(type);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const showVideo = previewType === 'video' || (value && isVideoUrl(value));

  return (
    <div className="space-y-3">
      <label className="block text-sm text-gray-400">Cover Image / Video</label>

      {value && (
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black aspect-video max-w-md">
          {showVideo ? (
            <video src={value} className="h-full w-full object-cover" controls muted playsInline />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Trip cover" className="h-full w-full object-cover" />
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <>
              <Loader2 size={16} className="animate-spin mr-2" />
              Uploading…
            </>
          ) : (
            <>
              {showVideo ? <Video size={16} className="mr-2" /> : <ImagePlus size={16} className="mr-2" />}
              {value ? 'Replace cover' : 'Upload cover'}
            </>
          )}
        </Button>
        {value && (
          <span className="text-xs text-[#a1a1a6] truncate max-w-xs" title={value}>
            {value}
          </span>
        )}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      <p className="text-xs text-[#a1a1a6]">JPG, PNG, WebP, MP4, WebM — up to 50MB</p>
    </div>
  );
}
