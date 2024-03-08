import { Card, CardContent, Typography } from "@mui/material";

const getTopSpeed = (speedData) =>
  speedData.length > 0 ? Math.max(...speedData) : 0;
const getAverageSpeed = (speedData) =>
  speedData.reduce((partialSum, a) => partialSum + a, 0) / speedData.length;
const getCurrentSpeed = (speedData) => speedData[speedData.length - 1];
const formatToKmPerHour = (value) => `${Math.round(value * 3.6 || 0)} km/h`;

const InfoPanel = ({ data, totalDistance }) => {
  const speedData = data.map(({ coords }) => coords?.speed);
  const currentSpeed = formatToKmPerHour(getCurrentSpeed(speedData));
  const averageSpeed = formatToKmPerHour(getAverageSpeed(speedData));
  const topSpeed = formatToKmPerHour(getTopSpeed(speedData));

  return (
    <Card>
      <CardContent className="grid grid-cols-1 sm:grid-cols-4 items-center">
        <Typography variant="h6">{`Current speed: ${currentSpeed}`}</Typography>
        <Typography variant="h6">{`Average speed: ${averageSpeed}`}</Typography>
        <Typography variant="h6">{`Top speed: ${topSpeed}`}</Typography>
        <Typography variant="h6">{`Distance: ${parseFloat(
          totalDistance / 1000
        ).toFixed(2)}km`}</Typography>
      </CardContent>
    </Card>
  );
};

export { InfoPanel };
