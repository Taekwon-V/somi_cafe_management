import { Box, Typography, Card, CardContent } from '@mui/material';

export default function Interior() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        🛋️ 인테리어 및 공간 기획
      </Typography>
      <Card sx={{ p: 3, boxShadow: 1, borderRadius: 2 }}>
        <CardContent>
          <Typography color="text.secondary">
            카페의 분위기를 결정할 인테리어 아이디어, 가구 배치, 공간 활용 계획을 정리하는 곳입니다.
            새로운 메모나 사진을 추가해 보세요.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
