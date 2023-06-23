import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import Form from './Components/Form';
import Summary from './Components/Summary';
import Submissions from './Components/Submissions';
import EditForm from './Components/EditForm';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Submissions />} />
          <Route path="/form" element={<Form />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/editform" element={<EditForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
