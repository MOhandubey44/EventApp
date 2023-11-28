import React, { useState, useEffect } from "react";
import EventCreationPage from "./eventCreationpage";
import EventListingPage from "./eventListingpage";
import { Routes, Route, Link } from "react-router-dom";

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);
  

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div>
      <nav
        className={`bg-purple-800 py-4 fixed w-full top-0 z-50 transition-opacity ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex justify-between items-center px-8">
          <Link to="/" className="text-white text-2xl font-bold uppercase">
            EventApp
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-110"
            >
              Create Event
            </Link>
            <Link
              to="/list"
              className="text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-110"
            >
              Event Listing
            </Link>
          </div>
        </div>
      </nav>
      <div className="mt-16">
        <Routes>
          <Route path="/" element={<EventCreationPage addEvent={addEvent} />} />
          <Route path="/list" element={<EventListingPage events={events} />} />
        </Routes>
      </div>
    </div>
  );
};

export default EventManager;
