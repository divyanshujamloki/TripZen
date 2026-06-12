export type MediaType = 'image' | 'video';

export interface Media {
  id: string;
  userId: string;
  type: MediaType;
  url: string;
  publicId: string;
  format: string;
  width?: number;
  height?: number;
  bytes?: number;
  originalName?: string;
  caption?: string;
  tripId?: string;
  createdAt: string;
  updatedAt: string;
}
