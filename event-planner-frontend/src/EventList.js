import React, { useEffect, useState } from "react";
import { fetchEvents, deleteEvent } from "./api";
import EventForm from "./EventForm";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getEvents() {
      const data = await fetchEvents();
      setEvents(data);
    }
    getEvents();
  }, []);

  const handleDelete = async (id) => {
    await deleteEvent(id);
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleEventCreated = (event) => {
    setEvents([...events, event]);
  };

  return (
    <div>
      <EventForm onEventCreated={handleEventCreated} />
      <h2>Events</h2>
      {events.length === 0 && <p>No events available</p>}
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> — {event.description} —{" "}
            {new Date(event.date).toLocaleDateString()} — {event.location}
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;