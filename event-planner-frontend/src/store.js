import { configureStore, createSlice } from '@reduxjs/toolkit';

// Slice for events
const eventsSlice = createSlice({
  name: 'events',
  initialState: [
    { id: 1, name: 'Pushkar Wedding', date: '2025-10-01' },
    { id: 2, name: 'Corporate Retreat', date: '2025-10-15' },
  ],
  reducers: {
    addEvent: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addEvent } = eventsSlice.actions;

const store = configureStore({
  reducer: {
    events: eventsSlice.reducer,
  },
});

export default store;