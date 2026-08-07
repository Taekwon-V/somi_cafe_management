import React, { useState, useEffect } from 'react';
import { Box, Input, Typography } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import type { BrandingDoc } from '../types/branding';

interface BrandingEditorProps {
  doc: BrandingDoc | null;
  onUpdateTitle: (id: string, title: string) => void;
  onUpdateContent: (id: string, content: string) => void;
}

export default function BrandingEditor({ doc, onUpdateTitle, onUpdateContent }: BrandingEditorProps) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  // Update local state when doc changes
  useEffect(() => {
    if (doc) {
      setContent(doc.content || '');
      setTitle(doc.title || '');
    }
  }, [doc?.id]);

  if (!doc) {
    return (
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff', height: '100%' }}>
        <Box sx={{ textAlign: 'center', color: '#bbb' }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 'normal' }}>문서가 선택되지 않았습니다.</Typography>
          <Typography variant="body2">왼쪽 사이드바에서 문서를 선택하거나 새로 만들어주세요.</Typography>
        </Box>
      </Box>
    );
  }

  const handleContentChange = (value?: string) => {
    const newContent = value || '';
    setContent(newContent);
    onUpdateContent(doc.id, newContent);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onUpdateTitle(doc.id, newTitle);
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', bgcolor: '#fff' }}>
      <Box sx={{ px: { xs: 4, md: 10 }, pt: 8, pb: 4, maxWidth: '1000px', width: '100%', mx: 'auto' }}>
        <Input
          fullWidth
          disableUnderline
          value={title}
          onChange={handleTitleChange}
          sx={{ 
            fontSize: '2.5rem', 
            fontWeight: 800, 
            color: '#222',
            letterSpacing: '-0.02em',
            '& input': { p: 0, '&::placeholder': { color: '#ddd', opacity: 1 } }
          }}
          placeholder="제목 없음"
        />
      </Box>
      {/* 
        This wrapper box forces full width and minWidth 0 to prevent MDEditor flex box breaking vertically 
      */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', px: { xs: 4, md: 10 }, pb: 10, maxWidth: '1000px', width: '100%', mx: 'auto', minWidth: 0 }} data-color-mode="light">
        <MDEditor
          value={content}
          onChange={handleContentChange}
          preview="edit"
          hideToolbar={false}
          visibleDragbar={false}
          style={{ 
            border: 'none', 
            boxShadow: 'none', 
            minHeight: '100%', 
            backgroundColor: 'transparent',
          }}
          textareaProps={{
            placeholder: '여기에 내용을 작성하세요...',
            style: { backgroundColor: 'transparent' }
          }}
        />
      </Box>
    </Box>
  );
}
