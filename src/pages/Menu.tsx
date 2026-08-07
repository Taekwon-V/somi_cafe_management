import { Box, Typography, Card, CardContent } from '@mui/material';

export default function Menu() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        ☕ 메뉴 및 레시피 개발
      </Typography>
      <Card sx={{ p: 3, boxShadow: 1, borderRadius: 2 }}>
        <CardContent>
          <Typography color="text.secondary">
            시그니처 메뉴, 레시피 테스트 기록, 원두 및 재료 단가 등을 관리하는 곳입니다.
            맛있는 아이디어를 이곳에 기록하세요.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
