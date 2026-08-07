import { Drawer, Box, Typography, TextField, IconButton, Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import type { GalleryCardData } from '../types/branding';

interface BrandingDrawerProps {
  open: boolean;
  card: GalleryCardData | null;
  onClose: () => void;
  onUpdateField: (fieldId: string, newValue: string) => void;
  onUpdateSummary: (newValue: string) => void;
}

export default function BrandingDrawer({ open, card, onClose, onUpdateField, onUpdateSummary }: BrandingDrawerProps) {
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
          {card.title} 편집
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ bgcolor: '#f5f5f5', '&:hover': { bgcolor: '#e0e0e0' } }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ p: 4, overflowY: 'auto', flexGrow: 1 }}>
        {/* 요약 문장 편집 필드 */}
        <Box sx={{ mb: 5, p: 3, bgcolor: '#e3f2fd', borderRadius: 3, border: '1px solid #bbdefb' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1565c0', mb: 1 }}>
            ⭐ 1줄 요약 (Summary)
          </Typography>
          <Typography variant="caption" sx={{ color: '#1976d2', display: 'block', mb: 1.5 }}>
            이 내용은 메인 화면의 기획안 요약 헤더에 표시됩니다.
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={2}
            value={card.summarySentence || ''}
            onChange={(e) => onUpdateSummary(e.target.value)}
            variant="outlined"
            placeholder="이 항목을 관통하는 한 줄 요약을 적어주세요."
            sx={{ 
              bgcolor: '#fff', 
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#bbdefb' }
            }}
          />
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 800, color: '#333', mb: 3 }}>세부 기획 내용</Typography>

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
              onChange={(e) => onUpdateField(field.id, e.target.value)}
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
          닫기 (입력 시 자동 저장됨)
        </Button>
      </Box>
    </Drawer>
  );
}
