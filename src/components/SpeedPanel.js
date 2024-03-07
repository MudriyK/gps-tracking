import { Card, CardContent, Typography } from "@mui/material";

const getTopSpeed = (speedData) => speedData.length > 0 ? Math.max(...speedData) : 0;
const getAverageSpeed = (speedData) => (speedData.reduce((partialSum, a) => partialSum + a, 0)) / speedData.length;
const getCurrentSpeed = (speedData) => speedData[speedData.length - 1];
const formatToKmPerHour = (value) => `${value * 3.6 || 0} km/h`;

const SpeedPanel = ({ data }) => {
  const speedData = data.map(({ speed }) => speed);
  const currentSpeed = formatToKmPerHour(getCurrentSpeed(speedData));
  const averageSpeed = formatToKmPerHour(getAverageSpeed(speedData));
  const topSpeed = formatToKmPerHour(getTopSpeed(speedData));

  return (
    <Card>
      <CardContent className="grid grid-cols-1 sm:grid-cols-4 items-center">
        <Typography className="mb-0" variant="h5" color="text.secondary" style={{ marginBottom: 0}} gutterBottom>
          {"Speed"}
        </Typography>
        <Typography variant="h6">{`Current: ${currentSpeed}`}</Typography>
        <Typography variant="h6">
          {`Average: ${averageSpeed}`}
        </Typography>
        <Typography variant="h6">
          {`Top: ${topSpeed}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { SpeedPanel };
