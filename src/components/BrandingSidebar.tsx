import React, { useState } from 'react';
import { 
  Box, List, ListItem, ListItemButton, ListItemText, 
  Collapse, IconButton, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material';
import { 
  ExpandLess, ExpandMore, Add as AddIcon, 
  Folder as FolderIcon, Description as DocIcon, Delete as DeleteIcon 
} from '@mui/icons-material';
import type { BrandingDoc } from '../types/branding';

interface BrandingSidebarProps {
  docs: BrandingDoc[];
  selectedDocId: string | null;
  onSelectDoc: (id: string) => void;
  onAddDoc: (parentId: string | null, type: 'folder' | 'document', title: string) => void;
  onDeleteDoc: (id: string) => void;
}

export default function BrandingSidebar({ docs, selectedDocId, onSelectDoc, onAddDoc, onDeleteDoc }: BrandingSidebarProps) {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newItemType, setNewItemType] = useState<'folder' | 'document'>('folder');
  const [newItemParentId, setNewItemParentId] = useState<string | null>(null);
  const [newItemTitle, setNewItemTitle] = useState('');

  const folders = docs.filter(d => d.type === 'folder');
  const getDocuments = (parentId: string) => docs.filter(d => d.type === 'document' && d.parentId === parentId);

  const handleToggleFolder = (id: string) => {
    setOpenFolders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openAddDialog = (type: 'folder' | 'document', parentId: string | null) => {
    setNewItemType(type);
    setNewItemParentId(parentId);
    setNewItemTitle('');
    setDialogOpen(true);
  };

  const handleAdd = () => {
    if (newItemTitle.trim()) {
      onAddDoc(newItemParentId, newItemType, newItemTitle.trim());
    }
    setDialogOpen(false);
  };

  return (
    <Box sx={{ 
      width: 280, 
      borderRight: '1px solid #f0f0f0', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      bgcolor: '#fafafa', 
      flexShrink: 0 
    }}>
      <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#333', letterSpacing: 0.5 }}>
          기획 목차
        </Typography>
        <IconButton size="small" onClick={() => openAddDialog('folder', null)} sx={{ bgcolor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', '&:hover': { bgcolor: '#f0f0f0' } }}>
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
      <List sx={{ flexGrow: 1, overflowY: 'auto', px: 1.5, pt: 0 }}>
        {folders.map(folder => (
          <React.Fragment key={folder.id}>
            <ListItem 
              disablePadding
              secondaryAction={
                <Box className="folder-actions" sx={{ display: 'none' }}>
                  <IconButton edge="end" size="small" onClick={(e) => { e.stopPropagation(); openAddDialog('document', folder.id); }} title="새 문서 추가">
                    <AddIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                  <IconButton edge="end" size="small" onClick={(e) => { e.stopPropagation(); onDeleteDoc(folder.id); }} title="카테고리 삭제">
                    <DeleteIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              }
              sx={{ '&:hover .folder-actions': { display: 'block' }, mb: 0.5 }}
            >
              <ListItemButton 
                onClick={() => handleToggleFolder(folder.id)} 
                sx={{ borderRadius: 1.5, py: 1, '&:hover': { bgcolor: '#f0f0f0' } }}
              >
                <FolderIcon sx={{ mr: 1.5, color: '#9e9e9e', fontSize: 18 }} />
                <ListItemText primary={<Typography variant="body2" sx={{ fontWeight: 600, color: '#444' }}>{folder.title}</Typography>} />
                {openFolders[folder.id] !== false ? <ExpandLess sx={{ fontSize: 18, color: '#999' }} /> : <ExpandMore sx={{ fontSize: 18, color: '#999' }} />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openFolders[folder.id] !== false} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ mb: 1 }}>
                {getDocuments(folder.id).map(doc => (
                  <ListItem 
                    key={doc.id} 
                    disablePadding
                    secondaryAction={
                      <IconButton className="doc-actions" edge="end" size="small" sx={{ display: 'none' }} onClick={(e) => { e.stopPropagation(); onDeleteDoc(doc.id); }} title="문서 삭제">
                        <DeleteIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    }
                    sx={{ '&:hover .doc-actions': { display: 'block' } }}
                  >
                    <ListItemButton 
                      sx={{ 
                        pl: 5, 
                        py: 0.75,
                        borderRadius: 1.5,
                        mb: 0.25,
                        bgcolor: selectedDocId === doc.id ? '#e3f2fd' : 'transparent',
                        '&:hover': { bgcolor: selectedDocId === doc.id ? '#e3f2fd' : '#f0f0f0' }
                      }}
                      onClick={() => onSelectDoc(doc.id)}
                    >
                      <DocIcon sx={{ mr: 1.5, color: selectedDocId === doc.id ? '#1976d2' : '#bdbdbd', fontSize: 16 }} />
                      <ListItemText primary={<Typography variant="body2" sx={{ color: selectedDocId === doc.id ? '#1976d2' : '#666', fontWeight: selectedDocId === doc.id ? 600 : 400 }}>{doc.title}</Typography>} />
                    </ListItemButton>
                  </ListItem>
                ))}
                {getDocuments(folder.id).length === 0 && (
                  <ListItem sx={{ pl: 5, py: 0.5 }}>
                    <Typography variant="caption" color="#aaa">문서가 없습니다.</Typography>
                  </ListItem>
                )}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
        {folders.length === 0 && (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              첫 카테고리를 추가해보세요.
            </Typography>
          </Box>
        )}
      </List>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>{newItemType === 'folder' ? '새 카테고리 추가' : '새 문서 추가'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={newItemType === 'folder' ? '카테고리 이름' : '문서 이름'}
            type="text"
            fullWidth
            variant="outlined"
            value={newItemTitle}
            onChange={(e) => setNewItemTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAdd();
              }
            }}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDialogOpen(false)} color="inherit">취소</Button>
          <Button onClick={handleAdd} variant="contained" disableElevation disabled={!newItemTitle.trim()} sx={{ borderRadius: 2 }}>추가</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
