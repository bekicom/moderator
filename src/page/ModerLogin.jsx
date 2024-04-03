import React, { useState } from "react";
import OtpInput from "react-otp-input";

export default function ModerLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [modal, setModal] = useState(false);
  console.log(modal);


  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  // sms submit

// sms submit
const handlesmssubmit = () => {
  setModal(false); // Modalni yopish

  const url = new URL("https://api.frossh.uz/api/auth/verify");

  const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
  };

  // Telefon raqamini to'g'ri formatga o'tkazish
  const formattedPhoneNumber = JSON.parse(localStorage.getItem('tel'))
  console.log(formattedPhoneNumber);

  const body = {
      phone_number: formattedPhoneNumber, // Modal oynasidan olgan telefon raqami
      code: otp, // Modal oynasidan olgan kod
  };

  fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
  })
      .then((response) => response.json())
      .then((data) => {
          // Ma'lumotlarni olinganidan so'ng qanday ishlashni yozing
          console.log(data);
          
      })
      .catch((error) => {
          // Xato bo'lganda qanday ishlashni yozing
          console.error("Xato:", error);
      });
};


    const handleSubmit = (event) => {
    event.preventDefault();

    const url = "https://api.frossh.uz/api/auth/login";
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // Telefon raqamini to'g'ri formatga o'tkazish
    const formattedPhoneNumber = `${phoneNumber}`;

    const body = {
      phone_number: formattedPhoneNumber,
    };

    localStorage.setItem('tel', JSON.stringify(formattedPhoneNumber))

    fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Ma'lumotlarni ko'rish
      })
      .catch((error) => {
        console.error("Xatolik:", error); // Xatolikni ko'rish
      });

    setPhoneNumber("");
  };
  return (
    <div className="moderlogin">
      <form onSubmit={handleSubmit}>
        <p>Moderator paneli</p>
        <input
          type="text"
          placeholder="+998"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <button onClick={() => setModal(!modal)} type="submit">
          Sms kod yuborish
        </button>
      </form>

      <div
        className="modalsms"
        style={modal ? { zIndex: "5" } : { zIndex: "-2" }}
      >
        <p>Sms kodini kiriting</p>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span style={{ margin: "0 5px" }}> - </span>}
          renderInput={(props, index) => (
            <input
              {...props}
              key={index}
              style={{
                width: "80px",
                height: "80px",
                textAlign: "center",
                border: "1px solid black",
                borderRadius: "5px",
                margin: "0 5px",
                fontSize: "23px",
              }}
              
            />
          )}
        />

        <button onClick={handlesmssubmit}>Yuborish</button>
      </div>
    </div>
  );
}
