import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

function EditForm() {
    const navigate = useNavigate();
    const today = new Date();
    const {state: updateData} = useLocation();

    // Prepopulate the form
    const [formData, setFormData] = useState({
        index: updateData.index,
        id: updateData.id,
        firstName: updateData.firstName,
        middleInitial: updateData.middleInitial,
        lastName: updateData.lastName,
        patientAddress: updateData.patientAddress,
        city: updateData.city,
        state: updateData.state,
        zipcode: updateData.zipcode,
        hospitalName: updateData.hospitalName,
        hospitalAddress: updateData.hospitalAddress,
        hospitalCity: updateData.hospitalCity,
        hospitalState: updateData.hospitalState,
        hospitalZipcode: updateData.hospitalZipcode,
        billAmount: updateData.billAmount,
        billImage: updateData.billImage,
        dateOfService: updateData.dateOfService,
    });
  
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        billImage: file,
      }));
    };
  
    const handleDateChange = (date) => {
        setFormData((prevFormData) => ({
        ...prevFormData,
        dateOfService: date,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!validateForm()) {
        setErrorMessage('Please fill in all required fields.');
      } else {
        // Save the form submission
        saveFormSubmission(formData);
        // Navigate to the summary page
        navigate('/summary', {state: formData});
      }
    };

    const validateForm = () => {
      const {
        firstName,
        lastName,
        patientAddress,
        city,
        state,
        zipcode,
        hospitalName,
        hospitalAddress,
        hospitalCity,
        hospitalState,
        hospitalZipcode,
        billAmount,
        billImage,
        dateOfService,
      } = formData;

      console.log(billImage);
  
      return (
        firstName.trim() !== '' &&
        lastName.trim() !== '' &&
        patientAddress.trim() !== '' &&
        city.trim() !== '' &&
        state.trim() !== '' &&
        zipcode.trim() !== '' &&
        hospitalName.trim() !== '' &&
        hospitalAddress.trim() !== '' &&
        hospitalCity.trim() !== '' &&
        hospitalState.trim() !== '' &&
        hospitalZipcode.trim() !== '' &&
        billAmount !== '' &&
        billImage !== null &&
        dateOfService !== null
      );
    };
  
    const saveFormSubmission = (data) => {
      // Convert the dateOfService value to a string
      const dateOfService = data.dateOfService ? data.dateOfService.toISOString() : null;
    
      // Create a new submission object with the converted dateOfService
      const submission = {
        ...data,
        dateOfService: dateOfService,
      };
    
      // Example: save form submission to local storage
      const submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
      submissions.splice(submission.index, 0, submission);
      localStorage.setItem('formSubmissions', JSON.stringify(submissions));
    };
  
    const options = [
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'Florida',
      'Georgia',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming',
    ];
  
    return (
        <div className="container">
          <h1 style={{color: '#4a4a4a'}}>Enter Your Medical Bill</h1>
          <form className="form-container" onSubmit={handleSubmit}>
            <h2>Patient Info</h2>
            <div className="form-row">
              <input
                className="form-input"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <input
                className="form-input"
                type="text"
                placeholder="Middle Initial"
                name="middleInitial"
                value={formData.middleInitial}
                onChange={handleInputChange}
              />
              <input
                className="form-input"
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
    
            <h2>Patient Address</h2>
            <input
              className="form-input"
              type="text"
              placeholder="Street Address"
              name="patientAddress"
              value={formData.patientAddress}
              onChange={handleInputChange}
            />
            <div className="form-row">
              <input
                className="form-input"
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
              <select
                className="form-input"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              >
                <option value="">State</option>
                {options.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
              <input
                className="form-input"
                type="text"
                placeholder="Zip Code"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleInputChange}
              />
            </div>
    
            <h2>Hospital Info</h2>
            <input
              className="form-input"
              type="text"
              placeholder="Hospital Name"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleInputChange}
            />
            <input
              className="form-input"
              type="text"
              placeholder="Hospital Address"
              name="hospitalAddress"
              value={formData.hospitalAddress}
              onChange={handleInputChange}
            />
            <div className="form-row">
              <input
                className="form-input"
                type="text"
                placeholder="Hospital City"
                name="hospitalCity"
                value={formData.hospitalCity}
                onChange={handleInputChange}
              />
              <select
                className="form-input"
                name="hospitalState"
                value={formData.hospitalState}
                onChange={handleInputChange}
              >
                <option value="">State</option>
                {options.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
              <input
                className="form-input"
                type="text"
                placeholder="Hospital Zip Code"
                name="hospitalZipcode"
                value={formData.hospitalZipcode}
                onChange={handleInputChange}
              />
            </div>
    
            <h2>Appointment Details</h2>
            <DatePicker
              className="form-input"
              selected={formData.dateOfService}
              onChange={handleDateChange}
              placeholderText="Date of Service"
              dateFormat={"MMMM d, yyyy"}
              maxDate={today}
            />
            <CurrencyInput
              className="form-input"
              prefix="$"
              placeholder="Bill Amount"
              name="billAmount"
              value={formData.billAmount}
              onValueChange={(value) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  billAmount: value,
                }))
              }
            />
              <input
                  className="form-input"
                  id='image-input'
                  type="file"
                  accept="image/*"
                  name="billImage"
                  style={{display:'none'}}
                  onChange={handleFileChange}
              />
            <div className='file-input-container'>
               <label htmlFor="image-input" className="file-input-label">
                  Upload Bill
              </label>
              {formData.billImage && (
            <p className="image-path">{formData.billImage.name}</p>
              )}
            </div>
  
              <div className='button-container'>
                  <button className="submit-button" type="submit">
                      Submit
                  </button>
                  <p className='error-message'>{errorMessage}</p>
  
              </div>
          </form>
        </div>
      );
  }

  export default EditForm;