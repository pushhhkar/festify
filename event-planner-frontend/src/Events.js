import React, { useEffect, useState } from "react";

function Events({ token }) {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null); // For editing event

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/events/", {
        headers: { Authorization: `Token ${token}` },
      });
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [token]);

  const handleAddOrEditEvent = async (e) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://127.0.0.1:8000/api/events/${editingId}/`
      : "http://127.0.0.1:8000/api/events/";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ title, description, location, date }),
      });

      if (response.ok) {
        setTitle("");
        setDescription("");
        setLocation("");
        setDate("");
        setEditingId(null);
        setMessage(editingId ? "Event updated!" : "Event added!");
        fetchEvents();
      } else {
        const data = await response.json();
        setMessage(data.detail || "Failed to save event");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error connecting to server");
    }
  };

  const handleEditClick = (event) => {
    setEditingId(event.id);
    setTitle(event.title);
    setDescription(event.description);
    setLocation(event.location);
    setDate(event.date.split("T")[0]); // Convert ISO date
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/events/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Token ${token}` },
      });
      if (response.ok) {
        setMessage("Event deleted!");
        fetchEvents();
      } else {
        setMessage("Failed to delete event");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error connecting to server");
    }
  };

  return (
    <div>
      <h1>Events</h1>

      <form onSubmit={handleAddOrEditEvent} style={{ marginBottom: "20px" }}>
        <h3>{editingId ? "Edit Event" : "Add New Event"}</h3>
        <div>
          <label>Title:</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <input value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Location:</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <button type="submit">{editingId ? "Update Event" : "Add Event"}</button>
      </form>

      {message && <p>{message}</p>}

      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> - {event.location} on{" "}
            {new Date(event.date).toLocaleDateString()}{" "}
            <button onClick={() => handleEditClick(event)}>Edit</button>{" "}
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Events;