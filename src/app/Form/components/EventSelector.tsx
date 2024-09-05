import React from 'react';
import { Box, Button, InputLabel } from '@mui/material';
import EventSelect from '../../../components/Popup/Popup';
import { MOODY_BLUE } from '../../../constants/colors';


interface EventSelectorProps {
  event: string;
  setEvent: (event: string) => void;
  popup: boolean;
  setPopup: (open: boolean) => void;
}

const EventSelector: React.FC<EventSelectorProps> = ({ event, setEvent, popup, setPopup }) => (
  <Box>
    <InputLabel id="stroke-label" sx={{ mt: 1, color: MOODY_BLUE }}>
      Event
    </InputLabel>
    <Button
      onClick={() => setPopup(true)}
      variant="outlined"
      fullWidth
    >
      {event}
    </Button>

    <EventSelect
      open={popup}
      onClose={() => setPopup(false)}
      onSelect={(selectedEvent) => {
        setEvent(selectedEvent);
        setPopup(false);  
      }}
    />
  </Box>
);

export default EventSelector;
