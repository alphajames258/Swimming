import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import {EVENTS} from '../../constants/swimmingConstants'


export default function EventSelect({ open, onClose, onSelect }) {
  const [search, setSearch] = useState('');

  const filteredEvent = EVENTS.filter(event =>
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
