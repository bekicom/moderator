import React, { useState, useRef } from "react";
import backround from "../assets/backround-image.png";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
const ModerLogin = () => {
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(59);
  const [error, setError] = useState(false);
  const phone_number = useRef();
  const naigate = useNavigate()

  function timer() {
    let timerInterval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timerInterval);
          setError(true);
          return 0;
        }
      });
    }, 1000);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      phone_number: phone_number.current.value,
      otp: otp,
    };
    console.log(data);
    timer();
    phone_number.current.value = "";
    setOtp("");
  }

  return (
    <div
      className="wrapper"
      style={{
        backgroundImage: `url(${backround})`,
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="moder-card">
        <form onSubmit={(e) => handleSubmit(e)}>
          <p>Moderator paneli</p>
          <input type="text" ref={phone_number} placeholder="+998" />
          <OtpInput
            containerStyle={{
              display: "flex",
              gap: "19px",
              marginTop: "39px",
              marginBottom: "19px",
            }}
            inputStyle={{
              width: "77px",
              height: "77px",
              borderRadius: "18px",
              fontSize: "25px",
              boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.25)",
              border: error ? "1px solid red" : "1px solid #3498DB",
              backgroundColor: "#F3F3F3",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              userSelect: "none",
              "::selection": {
                backgroundColor: "transparent",
                color: "#000",
              },
            }}
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span></span>}
            renderInput={(props) => <input {...props} />}
          />
          <label>
            <span style={time > 10 ? { color: "#3498DB" } : { color: "red" }}>
              00:{time <= 9 ? `0${time}` : time}
            </span>
            <p>Kod kelmadimi?</p>
            <span>Qayta yuborish</span>
          </label>
          <button onClick={() => naigate('/moder')} >Kirish</button>
        </form>
      </div>
    </div>
  );
};

export default ModerLogin;
