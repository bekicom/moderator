import React, { useState } from 'react';

export default function ModerLogin() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(phoneNumber);
    // Bu erda yuborish logikasini qo'shishingiz mumkin

    // Inputni tozalash
    setPhoneNumber('');
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  return (
    <div className='moderlogin'>
      <form onSubmit={handleSubmit}>
        <p>Moderator paneli</p>
        <input
          type="text"
          placeholder='+998'
          name="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <button type="submit">Sms kod yuborish</button>
      </form>
    </div>
  );
}
