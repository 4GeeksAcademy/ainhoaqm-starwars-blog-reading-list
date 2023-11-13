import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';

export const CharacterSingle = () => {
  const urlApiPeople = "https://www.swapi.tech/api/people/";
  const imgUrl = "https://starwars-visualguide.com/assets/img/characters/";
  
  const [character, setCharacter] = useState({});
  const params = useParams();

  const getAllelements = async () => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(urlApiPeople + params.uid, requestOptions);
    const data = await response.json();
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
          <img src={`${imgUrl}${params.uid}.jpg`} className="img-fluid rounded" alt="img character" />
        </div>
        <div className="col-md-8">
          <h1 className="display-4 fw-bold">{character.name}</h1>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Birth Year: {character.birth_year}</li>
            <li className="list-group-item">Homeworld: {character.homeworld}</li>
            <li className="list-group-item">Eye Color: {character.eye_color}</li>
            <li className="list-group-item">Gender: {character.gender}</li>
            <li className="list-group-item">Hair Color: {character.hair_color}</li>
            <li className="list-group-item">Height: {character.height} cm</li>
            <li className="list-group-item">Mass: {character.mass} kg</li>
            <li className="list-group-item">Skin Color: {character.skin_color}</li>
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