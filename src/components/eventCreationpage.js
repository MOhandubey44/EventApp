import React, { useState } from "react";

const EventCreationPage = ({ addEvent }) => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleEventCreation = (e) => {
    e.preventDefault();
    const eventData = {
      name: eventName,
      date: eventDate,
      time: eventTime,
      location: eventLocation,
      description: eventDescription,
    };

    const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
    existingEvents.push(eventData);
    localStorage.setItem("events", JSON.stringify(existingEvents));

    setEventName("");
    setEventDate("");
    setEventTime("");
    setEventLocation("");
    setEventDescription("");

    addEvent(eventData);
    setShowConfirmation(true);
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 w-full sm:w-11/12 md:w-9/12 lg:w-7/12 xl:w-5/12">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Create Event
          </h1>
          <form onSubmit={handleEventCreation} className="space-y-4">
            <div>
              <label
                htmlFor="eventName"
                className="block text-gray-700 font-bold mb-2"
              >
                Event Name
              </label>
              <input
                type="text"
                id="eventName"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="border-2 border-purple-300 rounded-md p-2 w-full focus:outline-none focus:border-purple-500"
                placeholder="Enter event name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="eventDate"
                className="block text-gray-700 font-bold mb-2"
              >
                Event Date
              </label>
              <input
                type="date"
                id="eventDate"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="border-2 border-purple-300 rounded-md p-2 w-full focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="eventTime"
                className="block text-gray-700 font-bold mb-2"
              >
                Event Time
              </label>
              <input
                type="time"
                id="eventTime"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className="border-2 border-purple-300 rounded-md p-2 w-full focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="eventLocation"
                className="block text-gray-700 font-bold mb-2"
              >
                Event Location
              </label>
              <input
                type="text"
                id="eventLocation"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className="border-2 border-purple-300 rounded-md p-2 w-full focus:outline-none focus:border-purple-500"
                placeholder="Enter event location"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full w-1/2"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-xl text-gray-800">Event created successfully!</p>
            <button
              className="mt-4 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowConfirmation(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCreationPage;
