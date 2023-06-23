import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";

function Submissions() {
    const navigate = useNavigate();
    const formSubmissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];

    const showForm = (submission) => {
        const formData = {
            index: submission.index,
            id: submission.id,
            firstName: submission.firstName,
            middleInitial: submission.middleInitial,
            lastName: submission.lastName,
            patientAddress: submission.patientAddress,
            city: submission.city,
            state: submission.state,
            zipcode: submission.zipcode,
            hospitalName: submission.hospitalName,
            hospitalAddress: submission.hospitalAddress,
            hospitalCity: submission.hospitalCity,
            hospitalState: submission.hospitalState,
            hospitalZipcode: submission.hospitalZipcode,
            billAmount: submission.billAmount,
            billImage: submission.billImage,
            dateOfService: new Date(submission.dateOfService),
        }
        navigate('/summary', {state: formData});
    }

    return (
        <div className="container">
        <h1 style={{color: '#7e77e5'}}>Home</h1>
        {formSubmissions.length === 0 ? (
            <p style={{color: '#4a4a4a'}}>Submit your medical bill to cut costs today!</p>
        ) : (
            <table className="submissions-table">
                <thead>
                <tr>
                    <th>Patient Name</th>
                    <th>Patient Address</th>
                    <th>Hospital Name</th>
                    <th>Hospital Address</th>
                    <th>Date of Service</th>
                    <th>Bill Amount</th>
                    <th>Bill Image</th>
                    <th>Actions</th> {/* Added column for actions */}
                </tr>
                </thead>
                <tbody>
                {formSubmissions.map((submission) => (
                    <tr>
                        <td>{submission.firstName} {submission.middleInitial} {submission.lastName}</td>
                        <td>{submission.patientAddress}, {submission.city}, {submission.state}, {submission.zipcode}</td>
                        <td>{submission.hospitalName}</td>
                        <td>{submission.hospitalAddress}, {submission.hospitalCity}, {submission.hospitalState}, {submission.hospitalZipcode}</td>
                        <td>{new Date(submission.dateOfService).toDateString()}</td>
                        <td>${submission.billAmount}</td>
                        <td>
                        {submission.billImage && (
                            <a className='action-button' href={`file://${submission.billImage}`} target="_blank" rel="noopener noreferrer">
                            View Image
                            </a>
                        )}
                        </td>
                        <td>
                            <button className='action-button' onClick={() => showForm(submission)}>
                                View Form
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        )}
        <div className='button-container'>
            <Link to="/form" className="link">
            New Form
            </Link>
        </div>
        </div>
  );
}

export default Submissions;