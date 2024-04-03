import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";

export default function ModerLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  // sms ni qayta yuborish

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => (prevSeconds === 0 ? 59 : prevSeconds - 1));
    }, 1000);



    return () => clearInterval(interval);
  }, [seconds]);



  // vaue
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  // sms submit
  const handlesmssubmit = () => {
    setModal(false);
    navigate("/moder");

    const url = new URL("https://api.frossh.uz/api/auth/verify");

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const formattedPhoneNumber = JSON.parse(localStorage.getItem("tel"));
    console.log(formattedPhoneNumber);

    const body = {
      phone_number: formattedPhoneNumber,
      code: otp,
    };

    fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const token = data.result.token;

        const tokenWithoutId = token.split('|').slice(1).join('|');
        console.log(tokenWithoutId);

        document.cookie = `token=${tokenWithoutId}; expires=Fri, 31 Dec 9999 23:59:59 GMT`; // Cookie muddati o'zgartirilishi mumkin
      })



      .catch((error) => {
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

    const formattedPhoneNumber = `${phoneNumber}`;

    const body = {
      phone_number: formattedPhoneNumber,
    };

    localStorage.setItem("tel", JSON.stringify(formattedPhoneNumber));

    fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Xatolik:", error);
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
          renderSeparator={<span style={{ margin: "0 5px" }}>  </span>}
          renderInput={(props, index) => (
            <input
              {...props}
              key={index}
              style={{
                width: "80px",
                height: "80px",
                textAlign: "center",
                border: `2px solid ${seconds === 0 ? "red" : "black"}`, // Set red border if seconds is 0
                borderRadius: "5px",
                margin: "0 5px",
                fontSize: "23px",
              }}
            />
          )}

        />
        <div className="qaytayuborish">
          <span style={seconds === 0 ? { color: "red" } : { color: "black" }}    >00:{seconds}</span> <span>Kod kelmadimi?</span>
          <span className="qayta" >Qayta yuborish</span>
        </div>


        <button onClick={handlesmssubmit}>Yuborish</button>
      </div>
    </div>
  );
}