// import { data } from "autoprefixer";
import React, { useState } from "react";
import "./App.css";

function App() {
  const api = "f91bb0d419f13d7751f9220c199e7a07";
  const [dataCuaca, setDataCuaca] = useState([{}]);
  const [kota, setKota] = useState("");

  const getCuaca = (event) => {
    if (event.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${kota}&units=imperial&APPID=${api}`)
        .then((response) => response.json())
        .then((data) => {
          setDataCuaca(data);
          setKota("");
        });
    }
  };
  return (
    <div className="container">
      <input className="input" placeholder="Masukan Nama Kota..." onChange={(e) => setKota(e.target.value)} value={kota} onKeyPress={getCuaca} />
      {typeof dataCuaca.main === "undefined" ? (
        <div>
          <p>Selamat datang di Aplikasi Cuaca, Masukan nama kota untuk mengetahui cuaca</p>
        </div>
      ) : (
        <div>
          <p>{dataCuaca.name}</p>
          <p>{Math.round(dataCuaca.main.temp - 32) / 1.8}℃</p>
          <p>{dataCuaca.weather[0].main}</p>
        </div>
      )}

      {dataCuaca.cod === "404" ? <p>Kota tidak ditemukan</p> : <></>}
    </div>
  );
}

export default App;
