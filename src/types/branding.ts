export interface GalleryCardField {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'textarea';
}

export interface GalleryCardData {
  id: string; // e.g., 'core', 'target', 'visual', 'space'
  title: string;
  thumbnailUrl: string;
  summarySentence: string; // 1줄 요약
  fields: GalleryCardField[];
}

export interface BrandingProposal {
  id: string;
  title: string; // e.g. 'A안 (모던 빈티지)', 'B안 (미니멀 화이트)'
  cards: GalleryCardData[]; // 항상 4개 고정
  updatedAt: number;
}
