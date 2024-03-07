import { Card, CardContent, Typography } from "@mui/material";

const formatCoordsValue = (value) => parseFloat(value.toFixed(4));

const MarkerInfo = ({ title, coords, className }) => (
  <Card>
    <CardContent className={className}>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2">{`Latitiude ${formatCoordsValue(
        coords.latitude
      )}`}</Typography>
      <Typography variant="body2">
        {`Longtitude: ${formatCoordsValue(coords.longitude)}`}
      </Typography>
      <Typography variant="body2">
        {`Speed: ${coords.speed * 3.6 || 0} km/h`}
      </Typography>
    </CardContent>
  </Card>
);

export { MarkerInfo };
