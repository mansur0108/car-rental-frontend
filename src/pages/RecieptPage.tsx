import React, { useState } from 'react';
import styles from './RecieptPage.module.css';

export default function RecieptPage() {
  // Constants
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');
  const [fuel, setFuel] = useState('unleaded');
  const [address, setAddress] = useState('');
  const [selectedOptionCar, setSelectedOptionCar] = useState('');
  const [selectedOptionFuel, setSelectedOptionFuel] = useState('');
  const [fee, setFee] = useState(0);
  const [cond, setCondition] = useState('');

  //Submitting Form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //To Add Form Submission Later
  };

  //Resetting The Form
  const handleReset = () => {
    // Reset all state variables here
    setFirstName('');
    setLastName('');
    setAddress('');
    setContact('');
    setFuel('unleaded');
    setSelectedOptionCar('');
    setSelectedOptionFuel('');
    setFee(0);
    setAddress('');
    setCondition('');
  };

  //Render Vendor Page
  return (
    <React.StrictMode>
      <div className={styles.formD}>
        <h1 className={styles.formH}>Reciept</h1>
        <fieldset>
          <form action='#' method='get' onSubmit={handleSubmit}>
            <label htmlFor='firstname'>First Name*</label>
            <input
              type='text'
              name='firstname'
              id='firstname'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='Enter First Name'
              required
            />
            <label htmlFor='lastname'>Last Name*</label>
            <input
              type='text'
              name='lastname'
              id='lastname'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Enter Last Name'
              required
            />
            <label htmlFor='tel'>Contact*</label>
            <input
              type='tel'
              name='contact'
              id='contact'
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder='Enter Mobile number'
              required
            />
            <label htmlFor='adr'>Address*</label>
            <input
              type='text'
              name='address'
              id='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder='Enter Address'
              required
            />
            <label>Type Of Vehicle</label>
            <select
              name='select'
              id='select'
              defaultValue='sedan'
              onChange={(e) => setSelectedOptionCar(e.target.value)}
            >
              <option value='sedan'>Sedan</option>
              <option value='suv'>SUV</option>
              <option value='truck'>Truck</option>
            </select>
            <label htmlFor='fuel'>Fuel Type*</label>
            <select
              name='select'
              id='select'
              defaultValue='gas'
              onChange={(e) => setSelectedOptionFuel(e.target.value)}
            >
              <option value='gas'>Gas</option>
              <option value='hybrid'>Hybrid</option>
              <option value='electric'>Electric</option>
            </select>
            <label htmlFor='fees'>Maintence Fees</label>
            <input
              type='number'
              name='fees'
              id='fees'
              value={fee}
              onChange={(e) => setFee(Number(e.target.value))}
            />
            <label htmlFor='cond'>Condition</label>
            <textarea
              name='cond'
              id='cond'
              cols={30}
              rows={10}
              onChange={(e) => setCondition(e.target.value)}
              placeholder='Condition Of Car'
              required
            ></textarea>
            <button type='reset' value='reset' onClick={() => handleReset()}>
              Reset
            </button>
            <button type='submit' value='Submit'>
              Submit
            </button>
          </form>
        </fieldset>
      </div>
    </React.StrictMode>
  );
}
