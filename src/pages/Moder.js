import React, { useState, useEffect } from "react";
import card_img from "../assets/card-image.png";
import trueBtn from "../assets/true.svg";
import falseBtn from "../assets/false.svg";
import banBtn from "../assets/ban.svg";
import exitBtn from "../assets/exit.svg";
import axios from "axios";

const Moder = () => {
  const [countPages, setCountPages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [announcements, setAnnouncements] = useState([]);
  const data = [
    {
      id: Date.now(),
      img: card_img,
      price: 40000000,
      countRooms: 3,
      floor: 3,
      area: 120,
      manzil: "Namangan viloyat, Chust shaxri, mustaqillik mahalla 123 uy.",
      phone_number: "+998 90 123-45-67",
      fullName: "Name Surname",
      country: "Uzbekistan",
    },
    {
      id: Date.now(),
      img: card_img,
      price: 40000000,
      countRooms: 3,
      floor: 3,
      area: 120,
      manzil: "Namangan viloyat, Chust shaxri, mustaqillik mahalla 123 uy.",
      phone_number: "+998 90 123-45-67",
      fullName: "Name Surname",
      country: "Uzbekistan",
    },
    {
      id: Date.now(),
      img: card_img,
      price: 40000000,
      countRooms: 3,
      floor: 3,
      area: 120,
      manzil: "Namangan viloyat, Chust shaxri, mustaqillik mahalla 123 uy.",
      phone_number: "+998 90 123-45-67",
      fullName: "Name Surname",
      country: "Uzbekistan",
    },
    {
      id: Date.now(),
      img: card_img,
      price: 40000000,
      countRooms: 3,
      floor: 3,
      area: 120,
      manzil: "Namangan viloyat, Chust shaxri, mustaqillik mahalla 123 uy.",
      phone_number: "+998 90 123-45-67",
      fullName: "Name Surname",
      country: "Uzbekistan",
    },
    {
      id: Date.now(),
      img: card_img,
      price: 40000000,
      countRooms: 3,
      floor: 3,
      area: 120,
      manzil: "Namangan viloyat, Chust shaxri, mustaqillik mahalla 123 uy.",
      phone_number: "+998 90 123-45-67",
      fullName: "Name Surname",
      country: "Uzbekistan",
    },
    {
      id: Date.now(),
      img: card_img,
      price: 40000000,
      countRooms: 3,
      floor: 3,
      area: 120,
      manzil: "Namangan viloyat, Chust shaxri, mustaqillik mahalla 123 uy.",
      phone_number: "+998 90 123-45-67",
      fullName: "Name Surname",
      country: "Uzbekistan",
    },
    {
      id: Date.now(),
      img: card_img,
      price: 40000000,
      countRooms: 3,
      floor: 3,
      area: 120,
      manzil: "Namangan viloyat, Chust shaxri, mustaqillik mahalla 123 uy.",
      phone_number: "+998 90 123-45-67",
      fullName: "Name Surname",
      country: "Uzbekistan",
    },
    {
      id: Date.now(),
      img: card_img,
      price: 40000000,
      countRooms: 3,
      floor: 3,
      area: 120,
      manzil: "Namangan viloyat, Chust shaxri, mustaqillik mahalla 123 uy.",
      phone_number: "+998 90 123-45-67",
      fullName: "Name Surname",
      country: "Uzbekistan",
    },
    {
      id: Date.now(),
      img: card_img,
      price: 40000000,
      countRooms: 3,
      floor: 3,
      area: 120,
      manzil: "Namangan viloyat, Chust shaxri, mustaqillik mahalla 123 uy.",
      phone_number: "+998 90 123-45-67",
      fullName: "Name Surname",
      country: "Uzbekistan",
    },
    {
      id: Date.now(),
      img: card_img,
      price: 40000000,
      countRooms: 3,
      floor: 3,
      area: 120,
      manzil: "Namangan viloyat, Chust shaxri, mustaqillik mahalla 123 uy.",
      phone_number: "+998 90 123-45-67",
      fullName: "Name Surname",
      country: "Uzbekistan",
    },
  ];

  console.log(announcements);

  //  api get
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.frossh.uz/api/announcement/get-by-moderation');
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="moder">
      <div className="moder-wrapper">
        <div className="card-wrapper">
          {data.map((item) => (
            <div className="card">
              <img src={item.img} alt="no image" />
              <span>{item.price} UZS</span>
              <p>
                {item.countRooms} xona | {item.floor}-qavat | {item.area}m
                <sup>3</sup>
              </p>
              <p>{item.manzil}</p>
              <b className="text-unit">Foydalanuvchi ma'lumotlari:</b>
              <h6>{item.phone_number}</h6>
              <div className="for-buttons">
                <div className="text">
                  <b className="text-unit">{item.fullName}</b>
                  <b className="text-unit">{item.country}</b>
                </div>
                <div className="buttons">
                  <button>
                    <img src={trueBtn} alt="true" />
                  </button>
                  <button>
                    <img src={falseBtn} alt="false" />
                  </button>
                  <button>
                    <img src={banBtn} alt="ban" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="moder-buttons">
          <button>
            <img src={exitBtn} alt="ban" />
          </button>
          <div className="button-group">
            {countPages.slice(0, 3).map((item) => (
              <button key={item}>{item}</button>
            ))}
            <p>...</p>
            <button>{countPages[countPages.length - 1]}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moder;
