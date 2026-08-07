export interface GalleryCardField {
  id: string;      // e.g., 'mission', 'vision'
  label: string;   // e.g., '미션 (Mission)'
  value: string;   // The text content
  type: 'text' | 'textarea';
}

export interface GalleryCardData {
  id: string;
  title: string;
  thumbnailUrl: string;
  fields: GalleryCardField[];
  updatedAt: number;
}
