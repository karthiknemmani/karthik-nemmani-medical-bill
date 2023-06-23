import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";

function Summary() {
    const navigate = useNavigate();
    const {state: formData} = useLocation();
    
    const handleEdit = () => {
        const formSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
        const updatedSubmissions = formSubmissions.filter((submission) => submission.id !== formData.id);
        localStorage.setItem('formSubmissions', JSON.stringify(updatedSubmissions));
        navigate('/editform', {state: formData});
    }

    return (
      <div className="container">
        <h1 style={{color: '#7e77e5'}}>Summary</h1>
        <table className="summary-table">
          <tbody>
            <tr>
              <th>Patient Name</th>
              <td>{formData.firstName} {formData.middleInitial} {formData.lastName}</td>
            </tr>
            <tr>
              <th>Patient Address</th>
              <td>{formData.patientAddress}, {formData.city}, {formData.state}, {formData.zipcode}</td>
            </tr>
            <tr>
              <th>Hospital Name</th>
              <td>{formData.hospitalName}</td>
            </tr>
            <tr>
              <th>Hospital Address</th>
              <td>{formData.hospitalAddress}, {formData.hospitalCity}, {formData.hospitalState}, {formData.hospitalZipcode}</td>
            </tr>
            <tr>
              <th>Date of Service</th>
              <td>{formData.dateOfService.toDateString()}</td>
            </tr>
            <tr>
              <th>Bill Amount</th>
              <td>${formData.billAmount}</td>
            </tr>
            <tr>
              <th>Bill Image</th>
              <td>
                {formData.billImage && (
                  <a href={formData.billImage} target="_blank" rel="noopener noreferrer">
                    View Image
                  </a>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className='button-container'>
            <button className='submit-button' onClick={handleEdit}>
                Edit
            </button>
            <Link to="/" className="link">
                Home
            </Link>
        </div>
      </div>
    );
  }

  export default Summary;