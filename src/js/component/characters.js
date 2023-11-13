import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

//icons
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export const Characters = () => {
  const { store, actions } = useContext(Context);
  const isFavorite = (uid, category) => store.favorites.some((fav) => fav.uid === uid && fav.category === category);
  const handleFavoritesClick = (item) => {
    const category = 'character'; 
    if (isFavorite(item.uid, category)) {
      actions.removeFavorite(item);
    } else {
      actions.addToFavorites(item, category);
    }
  };

  const urlApicharacters = "https://www.swapi.tech/api/people";
  const urlCharacterDetails = `https://www.swapi.tech/api/people/`
  const imgUrl = "https://starwars-visualguide.com/assets/img/characters/";
  
  const [characters, setCharacters] = useState([])
  const [detailedCharacters, setDetailedCharacters] = useState([]);

  const getAllelements = async () => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(urlApicharacters, requestOptions);
    const data = await response.json();
    setCharacters(data.results);
    console.log (data.results);
  };

  useEffect(() => {
    getAllelements();
  },[]);

  const getCharacterDetails = async (uid) => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(urlCharacterDetails + uid, requestOptions);
    const data = await response.json();
    return data.result.properties;
  };

  useEffect(() => {
    const fetchDetailedCharacters = async () => {
      const detailedChars = await Promise.all(
        characters.map(async (character) => {
          const details = await getCharacterDetails(character.uid);
          return { ...character, details };
        })
      );
      setDetailedCharacters(detailedChars);
    };
    fetchDetailedCharacters();
  }, [characters]);

  const getPlanetName = async (url) => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data.result.properties.name;
  };

  const [planetNames, setPlanetNames] = useState({});

  useEffect(() => {
    const fetchPlanetNames = async () => {
      const names = await Promise.all(
        detailedCharacters.map(async (item) => {
          const name = await getPlanetName(item.details.homeworld);
          return { uid: item.uid, name };
        })
      );
      const planetNameMap = names.reduce((map, obj) => {
        map[obj.uid] = obj.name;
        return map;
      }, {});
      setPlanetNames(planetNameMap);
    };
    fetchPlanetNames();
  }, [detailedCharacters]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPlanetNames = async () => {
      setLoading(true);
      const names = await Promise.all(
        detailedCharacters.map(async (item) => {
          const name = await getPlanetName(item.details.homeworld);
          return { uid: item.uid, name };
        })
      );
      const planetNameMap = names.reduce((map, obj) => {
        map[obj.uid] = obj.name;
        return map;
      }, {});
      setPlanetNames(planetNameMap);
      setLoading(false);
    };
    fetchPlanetNames();
  }, [detailedCharacters]);  

  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
      {detailedCharacters.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="card">
            <img src={`${imgUrl}${item.uid}.jpg`} className="card-img-top" alt="img character" />
            <div className="card-body" style={{ height: '163px'}}>
              <h5 className="card-title">
                <strong>{item.name}</strong>
              </h5>
              <p className="card-text">
                <strong>Homeworld:</strong>{" "}
                {loading ? "Cargando..." : planetNames[item.uid]} <br />
                <strong>Birth Year:</strong> {item.details.birth_year} <br />
                <strong>Gender:</strong> {item.details.gender}
              </p>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
              <Link to={"/single-character/" + item.uid}>
                <button className="btn btn-primary" type="button">
                  Learn more!
                </button>
              </Link>
              <button onClick={() => handleFavoritesClick(item)} className="btn btn-warning ms-1" type="button"> 
                {isFavorite(item.uid, 'character') ? <AiFillStar /> : <AiOutlineStar />}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );  
};