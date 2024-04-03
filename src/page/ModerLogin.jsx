import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { formatTime } from "./Utils";

export default function ModerLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  console.log(otp);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(60);


  // sms ni qayta yuborish
  const qayta = () => {
    const tel = JSON.parse(localStorage.getItem("tel"))

    fetch("https://api.frossh.uz/api/auth/resend", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },

      body: JSON.stringify({
        phone_number: tel
      })
    })
      .then(response => {
        setSeconds(59);
        if (!response.ok) {
          throw new Error('HTTP error, status = ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log(data); 
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds - 1 <= 0 ? 0 : prevSeconds - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);




  // vaue
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);

  };

  // sms submit
  const handlesmssubmit = () => {




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
        setSeconds(59);
        const tokenWithoutId = token.split('|').slice(1).join('|');
        console.log(tokenWithoutId);
        navigate('/moder')
        setOtp("")
        document.cookie = `token=${tokenWithoutId}; expires=Fri, 31 Dec 9999 23:59:59 GMT`; 
      })



      .catch((error) => {
        console.error("Xato:", error);
        setOtp(false)
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const url = "https://api.frossh.uz/api/auth/login";
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const phoneNumberWithoutPlus = phoneNumber.substring(1);


    const body = {
      phone_number: phoneNumberWithoutPlus,
    };

    localStorage.setItem("tel", JSON.stringify(phoneNumberWithoutPlus));

    fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSeconds(59);
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
          required
        />
        <button onClick={() => !phoneNumber ? null : setModal(!modal)} type="submit">
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
          numInputs={4}
          renderSeparator={<span style={{ margin: "0 5px" }}>  </span>}
          renderInput={(props, index) => (
            <input
              {...props}
              key={index}
              style={{
                width: "80px",
                height: "80px",
                textAlign: "center",
                border: `2px solid ${seconds === 0 || otp === false ? "red" : "black"}`, 
                borderRadius: "15px",
                margin: "0 5px",
                fontSize: "23px",
                required: true
              }}
            />
          )}


        />

        <div className="qaytayuborish">
          <span style={seconds === 0 ? { color: "red" } : { color: "black" }}>{formatTime(seconds)}</span>
          {
            seconds ? null : (
              <span className="calumsms" >

                <span onClick={qayta} className="qayta"> <span>Kod kelmadimi?</span>Qayta yuborish</span>
              </span>
            )
          }


        </div>


        <button onClick={handlesmssubmit}>Yuborish</button>
      </div>
    </div >
  );
}