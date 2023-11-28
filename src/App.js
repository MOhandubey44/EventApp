import React from 'react';
import EventManager from './components/EventManager';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<EventManager />} />
      </Routes>
    </Router>
  );
}

export default App;
