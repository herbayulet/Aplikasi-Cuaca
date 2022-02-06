// import { data } from "autoprefixer";
import React, { useState } from "react";
import "./App.css";

function App() {
  const api = "f91bb0d419f13d7751f9220c199e7a07"; /*ini adalah kunci dari API nya*/
  const [dataCuaca, setDataCuaca] = useState([{}]); /*untuk mendapatkan data cuaca dari API dalam bentuk objek*/
  const [kota, setKota] = useState("");

  const getCuaca = (event) => {
    if (event.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${kota}&units=imperial&APPID=${api}`) /*URL dari API cuaca*/
        .then((response) => response.json()) /*setelah ditangkap data nya, maka akan dikembalikan dalam bentuk JSON*/
        .then((data) => {
          setDataCuaca(data);
          setKota("");
        });
    }
  };
  return (
    <div className="container">
      <input className="input" placeholder="Masukan Nama Kota..." onChange={(e) => setKota(e.target.value)} value={kota} onKeyPress={getCuaca} />
      {typeof dataCuaca.main === "undefined" /*jika tidak memasukan nama kota dalam inputan akan mengeluarkan Selamat datang*/ ? (
        <div>
          <p>Selamat datang di Aplikasi Cuaca, Masukan nama kota untuk mengetahui cuaca</p>
        </div>
      ) : (
        /*dan jika memasukan nama kota yang sesuai dan ada dalam API maka akan me return 3 tag p dibawah ini*/
        <div>
          <p>{dataCuaca.name}</p>
          <p>{Math.round(Math.floor(dataCuaca.main.temp - 32) / 1.8)}℃</p>
          <p>{dataCuaca.weather[0].main}</p>
          {/* console.log({dataCuaca.weather[0].main}); */}
        </div>
      )}

      {dataCuaca.cod === "404" ? <p>Kota tidak ditemukan</p> : <></>}
    </div> /*jika kota yang di ketik dalam inputan tidak ada, maka akan me return tag P diatas*/
  );
}

export default App;
