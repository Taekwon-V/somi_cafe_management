import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import ChairIcon from '@mui/icons-material/Chair';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import CampaignIcon from '@mui/icons-material/Campaign';

const summaryData = [
  { title: '인테리어 아이디어', count: 5, icon: <ChairIcon fontSize="large" color="primary" /> },
  { title: '메뉴/레시피', count: 12, icon: <LocalCafeIcon fontSize="large" color="secondary" /> },
  { title: '브랜딩 기획', count: 3, icon: <CampaignIcon fontSize="large" color="success" /> },
];

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        현재 창업 준비 현황 🚀
      </Typography>
      <Grid container spacing={3}>
        {summaryData.map((data, index) => (
          <Grid size={{ xs: 12, sm: 4 }} key={index}>
            <Card sx={{ boxShadow: 2, borderRadius: 3 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ mr: 2 }}>{data.icon}</Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    {data.title}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {data.count}건
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          최근 업데이트된 아이디어
        </Typography>
        <Card sx={{ p: 3, boxShadow: 1, borderRadius: 2 }}>
          <Typography color="text.secondary">아직 등록된 세부 아이디어가 없습니다. 왼쪽 메뉴를 클릭해 새로운 아이디어를 추가해 보세요!</Typography>
        </Card>
      </Box>
    </Box>
  );
}
