import { Box, Typography, Card, CardContent } from '@mui/material';

export default function Branding() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        🏷️ 브랜딩 및 마케팅
      </Typography>
      <Card sx={{ p: 3, boxShadow: 1, borderRadius: 2 }}>
        <CardContent>
          <Typography color="text.secondary">
            카페 로고 스케치, 브랜드 컬러, 인스타그램 마케팅 전략 등을 정리하는 곳입니다.
            우리의 카페가 기억에 남도록 브랜드를 다듬어 보세요.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
