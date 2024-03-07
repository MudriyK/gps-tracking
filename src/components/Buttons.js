import { Button } from "@mui/material";

const Buttons = ({ isGPSActive, startWatching, stopWatching }) => (
  <div className="container p-5 flex items-center justify-start">
    {isGPSActive ? (
      <Button variant="contained" color="error" onClick={stopWatching}>
        Stop GPS tracking
      </Button>
    ) : (
      <Button variant="contained" color="primary" onClick={startWatching}>
        Start GPS tracking
      </Button>
    )}
  </div>
);

export { Buttons };
