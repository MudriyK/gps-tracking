import { Button, Checkbox, FormControlLabel } from "@mui/material";

const Buttons = ({ isGPSActive, startWatching, stopWatching, highAccuracy, setHighAccuracy }) => {
  const handleChangeFrequency = (e) => {
    setHighAccuracy(e.target.checked);
  };

    return (
    <div className="container p-5 flex items-center justify-between">
      {isGPSActive ? (
        <Button variant="contained" color="error" onClick={stopWatching}>
          Stop GPS tracking
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={startWatching}>
          Start GPS tracking
        </Button>
      )}

      <FormControlLabel
        disabled={isGPSActive}
        label="High Accuracy GPS"
        control={
          <Checkbox
            checked={highAccuracy}
            onChange={handleChangeFrequency}
          />
        }
      />
    </div>
  );
};

export { Buttons };
