import React, { useEffect, useState } from "react";
import tasdiqlash from "../Assets/tasdiqlash.svg";
import bekorqilish from "../Assets/bekorqilish.svg";
import bloklash from "../Assets/bloklash.svg";

export default function Moder() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = getCookie("token");

    const url = new URL(
      "https://api.frossh.uz/api/announcement/get-by-moderation"
    );
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    setLoading(true);

    fetch(url, {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setAnnouncements(data.result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  // reject function
  const reject = (id) => {
    const url = new URL(`https://api.frossh.uz/api/announcement/reject/${id}`);

    const token = getCookie("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    setLoading(true);

    fetch(url, {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        fetchData();
      })
      .catch((error) => {
        console.error("Xato:", error);
        setLoading(false);
      });
  };
  // accept function
  const accept = (id) => {
    const url = new URL(`https://api.frossh.uz/api/announcement/accept/${id}`);

    const token = getCookie("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    setLoading(true);

    fetch(url, {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        fetchData();
      })
      .catch((error) => {
        console.error("Xato:", error);
        setLoading(false);
      });
  };


// block function
const block = (id) => {

    const url = new URL(`https://api.frossh.uz/api/announcement/block/${id}`);

    const token = getCookie("token");
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
    };

    setLoading(true);

    fetch(url, {
        method: "GET",
        headers,
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        setLoading(false);
        fetchData(); // Yangi malumotlarni olish
    })
    .catch(error => {
        console.error('Xato:', error);
        setLoading(false);
    });
};



  const fetchData = () => {
    const token = getCookie("token");

    const url = new URL(
      "https://api.frossh.uz/api/announcement/get-by-moderation"
    );
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    setLoading(true);

    fetch(url, {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setAnnouncements(data.result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  return (
    <div className="moder">
      {loading && <div className="loader"></div>}
      {announcements.map((item, index) => (
        <div className="card" key={index}>
          {item.images && item.images.length > 0 && (
            <img src={`https://api.frossh.uz/${item.images[0].path}`} alt="" />
          )}
          <p>{item.price_uzs_formatted}UZS</p>
          <p>{item.slug}</p>
          <span>foydalanuvchi malumotlari:</span>
          <span>{item.user.phone_number}</span>
          <div className="controler">
            <div className="last">
              <span>{item.user.last_name}</span>
              <span>{item.address}</span>
            </div>
            <div className="control">
              <button onClick={() => accept(item.id)}>
                <img src={tasdiqlash} alt="" />
              </button>
              <button onClick={() => reject(item.id)}>
                <img src={bekorqilish} alt="" />
              </button>
              <button   onClick={()=> block(item.id)}  >
                <img src={bloklash} alt="" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
