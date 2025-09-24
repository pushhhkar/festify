import React from 'react';
import { useSelector } from 'react-redux';

function EventList() {
  // Get events from Redux store
  const events = useSelector(state => state.events);

  return (
    <div>
      <h1>My Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.name} - {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;