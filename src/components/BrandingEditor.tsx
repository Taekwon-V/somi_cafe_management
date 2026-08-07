import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import { BrandingDoc } from '../types/branding';

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
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
        <Typography color="text.secondary">왼쪽에서 문서를 선택하거나 새로 만들어주세요.</Typography>
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
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', bgcolor: 'background.paper' }}>
      <Box sx={{ px: 4, py: 3, borderBottom: '1px solid #e0e0e0' }}>
        <TextField
          variant="standard"
          fullWidth
          value={title}
          onChange={handleTitleChange}
          InputProps={{
            disableUnderline: true,
            style: { fontSize: '2rem', fontWeight: 'bold' }
          }}
          placeholder="제목 없음"
        />
      </Box>
      <Box sx={{ flexGrow: 1, overflow: 'auto' }} data-color-mode="light">
        <MDEditor
          value={content}
          onChange={handleContentChange}
          height="100%"
          preview="live"
          visibleDragbar={false}
          style={{ border: 'none', boxShadow: 'none', minHeight: '100%' }}
        />
      </Box>
    </Box>
  );
}
