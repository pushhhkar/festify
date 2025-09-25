const API_URL = "http://127.0.0.1:8000/api/events/";

export async function fetchEvents() {
    const response = await fetch(API_URL);
    return response.json();
}

export async function createEvent(eventData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
    });
    return response.json();
}

export async function updateEvent(id, eventData) {
    const response = await fetch(`${API_URL}${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
    });
    return response.json();
}

export async function deleteEvent(id) {
    await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
    });
}