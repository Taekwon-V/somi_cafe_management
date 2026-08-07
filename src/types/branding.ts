export interface BrandingDoc {
  id: string;
  title: string;
  content: string;
  parentId: string | null;
  type: 'folder' | 'document';
  updatedAt: number;
}
