import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import type { GalleryCardData } from '../types/branding';

interface BrandingGalleryCardProps {
  card: GalleryCardData;
}

export default function BrandingGalleryCard({ card }: BrandingGalleryCardProps) {
  return (
    <Card 
      elevation={0}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4, 
        border: '1px solid #eaeaea',
        bgcolor: '#fff',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 16px 32px -10px rgba(0,0,0,0.1)',
          borderColor: 'transparent'
        }
      }}
    >
      <CardMedia
        component="img"
        height="220"
        image={card.thumbnailUrl}
        alt={card.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#111', letterSpacing: '-0.02em', borderBottom: '2px solid #f0f0f0', pb: 2 }}>
          {card.title}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {card.fields.map((field) => (
            <Box key={field.id}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#666', mb: 0.5, letterSpacing: '-0.01em' }}>
                {field.label}
              </Typography>
              <Typography variant="body1" sx={{ color: '#222', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {field.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
