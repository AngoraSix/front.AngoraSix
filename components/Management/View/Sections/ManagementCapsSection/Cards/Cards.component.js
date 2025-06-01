import { Box, Typography, Card, CardContent, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { PieChart } from '@mui/x-charts/PieChart';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],

  minWidth: 150,
  maxWidth: 350,
}));

export const StatCard = ({
  label,
  value,
  subtext,
  background = '#f5f5f5',
  color = '#000',
}) => {
  return (
    <StyledCard sx={{ backgroundColor: background, color }}>
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          <Typography variant="subtitle2">{label.toUpperCase()}</Typography>

          <Typography variant="h5" fontWeight="bold">
            {value}
          </Typography>

          {subtext && (
            <Typography variant="caption" color="text.secondary">
              {subtext}
            </Typography>
          )}
        </Box>
      </CardContent>
    </StyledCard>
  );
};


export const PieChartCard = ({ title, data, isMobile }) => {
  const theme = useTheme();
  const chartConfig = {
    width: 350,
    height: 150,
    margin: { left: -50, },
    slotProps: {
      legend: {
        direction: 'column',
        position: {
          vertical: 'middle',
          horizontal: 'right',
        },
      },
    }
  }

  const mobileConfig = {
    width: 200,
    height: 250,
    margin: { left: 100, top: -100 },
    slotProps:{
      legend: {
        direction: 'row',
        position: {
          vertical: 'bottom',
          horizontal: 'middle',
        },
      },
    }
  }

  const config = isMobile ? mobileConfig : chartConfig;

  return (
    <StyledCard sx={{ backgroundColor: theme.palette.grey[50] }}>
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {title.toUpperCase()}
          </Typography>
          <PieChart
            series={[
              {
                data,
                innerRadius: 30,
                outerRadius: 65,
                paddingAngle: 2,
                cornerRadius: 4,
              },
            ]}
            {...config}
          />
        </Box>
      </CardContent>
    </StyledCard>
  );
};


