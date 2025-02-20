import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  addDays,
  subDays,
  isToday,
  parse,
  startOfWeek,
  endOfWeek,
} from "date-fns";

const generateRandomEvents = () => {
  const randomEvents = {};
  for (let i = 1; i <= 12; i++) {
    for (let j = 1; j <= 28; j += Math.floor(Math.random() * 5) + 1) {
      const date = `2025-${String(i).padStart(2, "0")}-${String(j).padStart(
        2,
        "0"
      )}`;
      randomEvents[date] = [
        { id: 1, time: "09:00 AM", event: "Workshop" },
        { id: 2, time: "12:00 PM", event: "Team Discussion" },
        { id: 3, time: "03:00 PM", event: "Client Presentation" },
      ];
    }
  }
  return randomEvents;
};

const initialEvents = generateRandomEvents();

const SchedulePage = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState(format(today, "yyyy-MM-dd"));
  const [searchDate, setSearchDate] = useState("");
  const [events, setEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({ time: "", event: "" });
  const [editingEvent, setEditingEvent] = useState(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startWeek = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday as first day of the week
  const endWeek = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const monthDays = eachDayOfInterval({ start: startWeek, end: endWeek });
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const selectedEvents = events[selectedDate] || [];
  const progress = selectedEvents.length ? (selectedEvents.length / 5) * 100 : 0;

  const handleSearch = () => {
    if (searchDate) {
      const parsedDate = parse(searchDate, "yyyy-MM-dd", new Date());
      setCurrentMonth(parsedDate);
      setSelectedDate(format(parsedDate, "yyyy-MM-dd"));
    }
  };

  const handleAddEvent = () => {
    if (newEvent.time && newEvent.event) {
      const updatedEvents = {
        ...events,
        [selectedDate]: [
          ...(events[selectedDate] || []),
          { id: Date.now(), time: newEvent.time, event: newEvent.event },
        ],
      };
      setEvents(updatedEvents);
      setNewEvent({ time: "", event: "" });
    }
  };

  const handleDeleteEvent = (id) => {
    setEvents({
      ...events,
      [selectedDate]: events[selectedDate].filter((event) => event.id !== id),
    });
  };

  const handleEditEvent = (id) => {
    const eventToEdit = selectedEvents.find((event) => event.id === id);
    if (eventToEdit) {
      setEditingEvent(eventToEdit);
      setNewEvent({ time: eventToEdit.time, event: eventToEdit.event });
    }
  };

  const handleUpdateEvent = () => {
    if (editingEvent && newEvent.time && newEvent.event) {
      setEvents({
        ...events,
        [selectedDate]: events[selectedDate].map((event) =>
          event.id === editingEvent.id
            ? { ...event, time: newEvent.time, event: newEvent.event }
            : event
        ),
      });
      setEditingEvent(null);
      setNewEvent({ time: "", event: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
        {/* Search Bar */}
        <div className="flex mb-4 space-x-2">
          <input
            type="date"
            className="border p-2 rounded-md w-full"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </div>

        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="text-lg font-semibold text-gray-700"
          >
            ←
          </button>
          <h2 className="text-2xl font-semibold text-center">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="text-lg font-semibold text-gray-700"
          >
            →
          </button>
        </div>

        {/* Weekday Labels */}
        <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-700 mb-2">
          {weekDays.map((day, index) => (
            <div key={index} className="p-2 bg-gray-300 rounded-md">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 text-center mb-4">
          {monthDays.map((day) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const hasEvents = events[dateKey]?.length > 0;

            return (
              <motion.button
                key={dateKey}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedDate(dateKey)}
                className={`relative p-2 rounded-md font-medium transition-all ${
                  dateKey === selectedDate
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } ${isToday(day) ? "border-2 border-blue-600" : ""}`}
              >
                {format(day, "d")}
                {hasEvents && <span className="absolute top-0 right-0 text-yellow-500">⭐</span>}
              </motion.button>
            );
          })}
        </div>

        {/* Events Section */}
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Scheduled Events</h3>
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          {selectedEvents.length > 0 ? (
            selectedEvents.map((item) => (
              <div key={item.id} className="flex justify-between py-2 border-b">
                <span className="text-gray-600 font-medium">{item.time}</span>
                <span className="text-gray-900 font-semibold">{item.event}</span>
                <div>
                  <button onClick={() => handleEditEvent(item.id)} className="text-blue-500 mr-2">Edit</button>
                  <button onClick={() => handleDeleteEvent(item.id)} className="text-red-500">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No events scheduled</p>
          )}
        </div>

        {/* Add or Edit Event */}
        <div className="mt-4 flex gap-2">
          <input type="time" className="border p-2 rounded-md" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} />
          <input type="text" placeholder="Event Name" className="border p-2 rounded-md flex-1" value={newEvent.event} onChange={(e) => setNewEvent({ ...newEvent, event: e.target.value })} />
          <button onClick={editingEvent ? handleUpdateEvent : handleAddEvent} className="bg-green-500 text-white px-4 py-2 rounded-md">{editingEvent ? "Update" : "Add"}</button>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
