import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';

export const StarshipSingle = () => {
  const urlApiStarship = "https://www.swapi.tech/api/starships/";
  const imgUrl = "https://starwars-visualguide.com/assets/img/starships/";
  
  const [starship, setStarship] = useState({});
  const params = useParams();

  const getAllelements = async () => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(urlApiStarship + params.uid, requestOptions);
    const data = await response.json();
    setStarship(data.result.properties);
    console.log(data.result.properties);
  };

  useEffect(() => {
    getAllelements();
  }, []);

  const getStarshipImage = (uid) => {
    switch (uid) {
      case '2':
        return 'https://static.wikia.nocookie.net/starwars/images/3/38/Corvette_negvv.png/revision/latest?cb=20170410043658';
      case '3':
        return 'https://static.wikia.nocookie.net/disney/images/a/a8/ImpStarDestroyer-SWI125.jpg/revision/latest/scale-to-width-down/1030?cb=20121223231202';
      case '17':
        return 'https://static.wikia.nocookie.net/swse/images/e/eb/GR-75_Medium_Transport.jpg/revision/latest?cb=20180927164807';
      default:
        return `${imgUrl}${uid}.jpg`;
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
        <img src={getStarshipImage(params.uid)} className="img-fluid rounded" alt="img starship"
          style={{ objectFit: 'contain', height: '500px',}}/>
        </div>
        <div className="col-md-8">
          <h1 className="display-4 fw-bold">{starship.name}</h1>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Consumables: {starship.consumables}</li>
            <li className="list-group-item">Cargo capacity: {starship.cargo_capacity}</li>
            <li className="list-group-item">Cost in credits: {starship.cost_in_credits}</li>
            <li className="list-group-item">Created: {starship.created}</li>
            <li className="list-group-item">Crew: {starship.crew}</li>
            <li className="list-group-item">Passengers: {starship.passengers} cm</li>
            <li className="list-group-item">Manufacturer: {starship.manufacturer} kg</li>
            <li className="list-group-item">Max atmosphering speed: {starship.max_atmosphering_speed}</li>
            <li className="list-group-item">Hyperdrive rating: {starship.hyperdrive_rating}</li>
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