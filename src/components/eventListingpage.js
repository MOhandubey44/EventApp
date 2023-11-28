import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const EventListingPage = () => {
  const [events, setEvents] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [upcoming, setUpcoming] = useState(true);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  const handleDeleteEvent = (index) => {
    setShowConfirmation(true);
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  const getFormattedTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:${(minute < 10 ? "0" : "") + minute} ${period}`;
  };

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const currentDate = new Date();
    return upcoming ? eventDate >= currentDate : eventDate < currentDate;
  });

  return (
    <>
      <div className="flex w-full items-center justify-around py-4">
        <h1 className="text-3xl font-bold text-white">Events</h1>
        <div className="flex items-center">
          <button
            className={`mr-3 text-white font-semibold py-2 px-4 rounded focus:outline-none ${
              upcoming ? "bg-blue-500" : "bg-gray-500"
            }`}
            onClick={() => setUpcoming(true)}
          >
            Upcoming
          </button>
          <button
            className={`text-white font-semibold py-2 px-4 rounded focus:outline-none ${
              upcoming ? "bg-gray-500" : "bg-blue-500"
            }`}
            onClick={() => setUpcoming(false)}
          >
            Past
          </button>
        </div>
      </div>
      {filteredEvents.length === 0 ? (
        <div className="flex items-center h-64 overflow-hidden">
          <p className="text-3xl font-bold text-white-600 animate-slide">
            Oops! Looks like this place is lonely...
            <br />
            No events scheduled yet!
          </p>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col justify-center">
          <div className="p-4">
            <div className="w-auto">
              {filteredEvents.map((event, index) => (
                <div className="flex mb-6" key={index}>
                  <div className="w-1/5 p-4 ml-10">
                    <div className="text-3xl font-bold mb-2 text-white">
                      {new Date(event.date).getDate()}{" "}
                      {new Date(event.date).toLocaleString("default", {
                        month: "short",
                      })}
                    </div>
                    <div className="text-lg font-bold text-gray-100">
                      {new Date(event.date).toLocaleString("default", {
                        weekday: "long",
                      })}
                    </div>
                  </div>
                  <div className="w-3/4 border rounded-md p-4 pb-1 shadow-md bg-white ">
                    <div className="flex mb-0">
                      <div className="w-3/4">
                        <p className="text-lg text-gray-400 mb-2 font-semibold">
                          {getFormattedTime(event.time)}
                        </p>
                        <h1 className="text-4xl text-gray-800 mb-2 font-semibold">
                          {event.name}
                        </h1>
                        <div className="flex">
                          <FontAwesomeIcon
                            icon={faVideo}
                            className="self-center mr-2 mb-1 text-gray-700"
                          />
                          <p className="text-lg text-gray-400 mb-2 font-semibold">
                            Virtual
                          </p>
                        </div>
                        <div className="flex">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="self-center mr-2 mb-1 text-gray-700"
                          />
                          <p className="text-lg text-gray-400 mb-2 font-semibold">
                            {event.location}
                          </p>
                        </div>
                        <div className="flex">
                          <img
                            src="https://media.licdn.com/dms/image/D4E0BAQEiS24jHhVNQQ/company-logo_200_200/0/1691429374836/octoml_logo?e=2147483647&v=beta&t=sk8huQCCcFfU5YthgpIhIRLJsW3DyQYpZ600YDlkTKM"
                            className="mr-2 mb-1 w-5 h-5 ml-0 self-center"
                            alt=""
                          />
                          <p className="text-lg text-gray-400 mb-2 font-semibold">
                            By OctoML
                          </p>
                        </div>
                      </div>
                      <div className="justify-end ml-10">
                        <img
                          src="https://cdn.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg"
                          alt=""
                          className="h-44 w-44"
                        ></img>
                      </div>
                    </div>
                    <div className="flex items-center justify-end">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-500 cursor-pointer hover:text-red-700 text-lg"
                        onClick={() => handleDeleteEvent(index)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {showConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg">
                <p className="text-xl text-gray-800">
                  Event deleted successfully!
                </p>
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
      )}
    </>
  );
};

export default EventListingPage;
