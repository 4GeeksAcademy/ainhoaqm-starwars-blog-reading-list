import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';

export const PlanetSingle = () => {
  const urlApiPlanet = "https://www.swapi.tech/api/planets/"; 
  const imgUrl = "https://starwars-visualguide.com/assets/img/planets/";

  const [planet, setCharacter] = useState({});
  const params = useParams();

  const getAllelements = async () => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(urlApiPlanet + params.uid, requestOptions);
    const data = await response.json();
    if (params.uid === '1') {
      data.result.properties.image_url = 'https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png/revision/latest?cb=2013121416235';
    }
    setCharacter(data.result.properties);
    console.log(data.result.properties);
  };

  useEffect(() => {
    getAllelements();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img src={planet.image_url || `${imgUrl}${params.uid}.jpg`} className="img-fluid rounded" alt="img planet" />        
        </div>
        <div className="col-md-8">
          <h1 className="display-4 fw-bold">{planet.name}</h1>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Diameter: {planet.diameter}</li>
            <li className="list-group-item">Rotation period: {planet.rotation_period}</li>
            <li className="list-group-item">Orbital period: {planet.orbital_period}</li>
            <li className="list-group-item">Gravity: {planet.gravity}</li>
            <li className="list-group-item">Population: {planet.population}</li>
            <li className="list-group-item">Climate: {planet.climate} cm</li>
            <li className="list-group-item">Terrain: {planet.terrain} kg</li>
          </ul>
          <div className="mt-4">
            <Link to={"/"}>
              <button className="btn btn-primary" type="button"> Go Back </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};