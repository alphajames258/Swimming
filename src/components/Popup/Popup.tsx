import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import {FREESTYLE_ICON, BACKSTROKE_ICON, BREASTSTROKE_ICON, BUTTERFLY_ICON} from '../../constants/swimmingConstants'
const events = [

  { name: '50 Yard Freestyle', imgSrc: FREESTYLE_ICON },
  { name: '100 Yard Freestyle', imgSrc: FREESTYLE_ICON },
  { name: '200 Yard Freestyle', imgSrc: FREESTYLE_ICON },
  { name: '500 Yard Freestyle', imgSrc: FREESTYLE_ICON },
  

  { name: '50 Yard Backstroke', imgSrc: BACKSTROKE_ICON },
  { name: '100 Yard Backstroke', imgSrc: BACKSTROKE_ICON },
  { name: '200 Yard Backstroke', imgSrc: BACKSTROKE_ICON },
  { name: '400 Yard Backstroke', imgSrc: BACKSTROKE_ICON },
  

  { name: '50 Yard Breaststroke', imgSrc: BREASTSTROKE_ICON },
  { name: '100 Yard Breaststroke', imgSrc: BREASTSTROKE_ICON },
  { name: '200 Yard Breaststroke', imgSrc: BREASTSTROKE_ICON },
  { name: '400 Yard Breaststroke', imgSrc: BREASTSTROKE_ICON },
  
  
  { name: '50 Yard Butterfly', imgSrc: BUTTERFLY_ICON },
  { name: '100 Yard Butterfly', imgSrc: BUTTERFLY_ICON },
  { name: '200 Yard Butterfly', imgSrc: BUTTERFLY_ICON },
];


export default function EventSelect({ open, onClose, onSelect }) {
  const [search, setSearch] = useState('');

  const filteredEvent = events.filter(event =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log(filteredEvent, 'Event')
  return (
    <Dialog open={open}  fullWidth maxWidth="sm">
      <DialogTitle>
        Select Event
       
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          placeholder="Search for Event"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        
          sx={{ mb: 1 }}
        />
        <List>
          {filteredEvent.map((event) => (
            <ListItem button onClick={() => onSelect(event.name)} key={event.name}>
              <img
                src={event.imgSrc}
                alt={event.name}
                style={{ width: '40px', height: '40px', marginRight: '10px' }}
              />

              <ListItemText primary={event.name} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
