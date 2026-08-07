import { Drawer, Box, Typography, TextField, IconButton, Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import type { GalleryCardData } from '../types/branding';

interface BrandingDrawerProps {
  open: boolean;
  card: GalleryCardData | null;
  onClose: () => void;
  onUpdateField: (cardId: string, fieldId: string, newValue: string) => void;
}

export default function BrandingDrawer({ open, card, onClose, onUpdateField }: BrandingDrawerProps) {
  if (!card) return null;

  return (
    <Drawer 
      anchor="right" 
      open={open} 
      onClose={onClose}
      sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 480 }, p: 0, bgcolor: '#fafafa' } }}
    >
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#fff', borderBottom: '1px solid #eee' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#222', letterSpacing: '-0.01em' }}>
          {card.title}
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ bgcolor: '#f5f5f5', '&:hover': { bgcolor: '#e0e0e0' } }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ p: 4, overflowY: 'auto', flexGrow: 1 }}>
        {card.fields.map((field) => (
          <Box key={field.id} sx={{ mb: 4 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#555', mb: 1 }}>
              {field.label}
            </Typography>
            <TextField
              fullWidth
              multiline={field.type === 'textarea'}
              minRows={field.type === 'textarea' ? 4 : 1}
              value={field.value}
              onChange={(e) => onUpdateField(card.id, field.id, e.target.value)}
              variant="outlined"
              placeholder={`${field.label} 내용을 입력하세요...`}
              sx={{ 
                bgcolor: '#fff', 
                '& .MuiOutlinedInput-root': { borderRadius: 2 },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#bdbdbd' },
              }}
            />
          </Box>
        ))}
      </Box>
      <Box sx={{ p: 3, bgcolor: '#fff', borderTop: '1px solid #eee' }}>
        <Button fullWidth variant="contained" disableElevation sx={{ py: 1.5, borderRadius: 2, fontWeight: 700, bgcolor: '#111', '&:hover': { bgcolor: '#333' } }} onClick={onClose}>
          닫기 (자동 저장됨)
        </Button>
      </Box>
    </Drawer>
  );
}
