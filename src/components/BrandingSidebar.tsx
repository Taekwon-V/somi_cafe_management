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
    <Box sx={{ width: 280, borderRight: '1px solid #e0e0e0', height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', flexShrink: 0 }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>브랜딩 문서</Typography>
        <IconButton size="small" onClick={() => openAddDialog('folder', null)} title="새 카테고리 추가">
          <AddIcon />
        </IconButton>
      </Box>
      <List sx={{ flexGrow: 1, overflowY: 'auto', p: 0 }}>
        {folders.map(folder => (
          <React.Fragment key={folder.id}>
            <ListItem 
              disablePadding
              secondaryAction={
                <Box>
                  <IconButton edge="end" size="small" onClick={(e) => { e.stopPropagation(); openAddDialog('document', folder.id); }} title="새 문서 추가">
                    <AddIcon fontSize="small" />
                  </IconButton>
                  <IconButton edge="end" size="small" onClick={(e) => { e.stopPropagation(); onDeleteDoc(folder.id); }} title="카테고리 삭제">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              }
            >
              <ListItemButton onClick={() => handleToggleFolder(folder.id)} sx={{ pl: 2 }}>
                <FolderIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                <ListItemText primary={<Typography variant="body2" sx={{ fontWeight: 'medium' }}>{folder.title}</Typography>} />
                {openFolders[folder.id] ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openFolders[folder.id] !== false} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {getDocuments(folder.id).map(doc => (
                  <ListItem 
                    key={doc.id} 
                    disablePadding
                    secondaryAction={
                      <IconButton edge="end" size="small" onClick={(e) => { e.stopPropagation(); onDeleteDoc(doc.id); }} title="문서 삭제">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    }
                  >
                    <ListItemButton 
                      sx={{ pl: 5 }} 
                      selected={selectedDocId === doc.id}
                      onClick={() => onSelectDoc(doc.id)}
                    >
                      <DocIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 18 }} />
                      <ListItemText primary={<Typography variant="body2">{doc.title}</Typography>} />
                    </ListItemButton>
                  </ListItem>
                ))}
                {getDocuments(folder.id).length === 0 && (
                  <ListItem sx={{ pl: 5, py: 1 }}>
                    <Typography variant="caption" color="text.disabled">문서가 없습니다.</Typography>
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

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>{newItemType === 'folder' ? '새 카테고리 추가' : '새 문서 추가'}</DialogTitle>
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>취소</Button>
          <Button onClick={handleAdd} variant="contained" disabled={!newItemTitle.trim()}>추가</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
