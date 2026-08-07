import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import type { GalleryCardData } from '../types/branding';

interface BrandingGalleryCardProps {
  card: GalleryCardData;
  onClick: () => void;
}

export default function BrandingGalleryCard({ card, onClick }: BrandingGalleryCardProps) {
  return (
    <Card 
      elevation={0}
      sx={{ 
        borderRadius: 4, 
        border: '1px solid #eaeaea',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 16px 32px -10px rgba(0,0,0,0.15)',
          borderColor: 'transparent'
        }
      }}
    >
      <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
        <CardMedia
          component="img"
          height="200"
          image={card.thumbnailUrl}
          alt={card.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1.25rem', color: '#111', letterSpacing: '-0.01em' }}>
            {card.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {card.fields.length}개의 세부 항목
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
