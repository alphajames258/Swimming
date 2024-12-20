import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { EVENTS } from '../../constants/swimmingConstants';
import Image from 'next/image';

export default function EventSelect({ open, onClose, onSelect }) {
  const [search, setSearch] = useState('');
  const filteredEvent = EVENTS;

  return (
    <Dialog open={open} fullWidth maxWidth='sm' onClose={onClose}>
      <DialogTitle>Select Event</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          placeholder='Search for Event'
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ mb: 1 }}
        />
        <List>
          {filteredEvent.map(event => (
            <ListItem button onClick={() => onSelect(event)} key={event.name}>
              <Image
                src={event.imgSrc}
                alt={event.name}
                width={40}
                height={40}
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
