import React, { useEffect, useState } from "react";
import Card from "./Card";
import Info from "./Info";
import axios from "axios";

const Main = () => {

  const [pokeData, setPokeData]= useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");

useEffect(() => {
  axios.get(url).then(res => {
    console.log(res.data);
  })
}, [url]);

  return (
    <React.Fragment>
    <div className="container">
      <div className="left-content">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <div className="btn-group">
          <button>Previous</button>
          <button>Next</button>
        </div>
      </div>
       <div className="right-content">
        <Info/>
       </div>
    </div>
  </React.Fragment>
  )


}

export default Main;