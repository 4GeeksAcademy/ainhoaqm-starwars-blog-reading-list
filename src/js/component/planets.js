import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

//icons
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export const Planets = () => {
  const { store, actions } = useContext(Context);
  const isFavorite = (uid, category) => store.favorites.some((fav) => fav.uid === uid && fav.category === category);
  const handleFavoritesClick = (item) => {
    const category = 'planet'; 
    if (isFavorite(item.uid, category)) {
      actions.removeFavorite(item);
    } else {
      actions.addToFavorites(item, category);
    }
  };

  const urlApiPlanets = "https://www.swapi.tech/api/planets";
  const imgUrl = "https://starwars-visualguide.com/assets/img/planets/";

  const [planets, setPlanets] = useState([])

  const getAllelements = async () => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(urlApiPlanets, requestOptions);
    const data = await response.json();
    setPlanets(data.results);
    console.log (data.results);
  };

  useEffect(() => {
      getAllelements();
  },[]);

  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
      {planets.map((item, index) => (
        <div key={index} className="col mb-4">
          <div className="card">
            <img className="card-img-top" alt="img planet"
              src={
                item.uid === '1' 
                  ? 'data:image/jpeg;base64,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' 
                  : `${imgUrl}${item.uid}.jpg`}
            />
            <div className="card-body" /*style={{ height: '181px'}}*/>
              <h5 className="card-title">
                <strong>{item.name}</strong>
              </h5>
              <p className="card-text"></p>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
              <Link to={"/single-planet/" + item.uid}>
                <button className="btn btn-primary" type="button">
                  Learn more!
                </button>
              </Link>
              <button onClick={() => handleFavoritesClick(item)} className="btn btn-warning ms-1" type="button"> 
                {isFavorite(item.uid, 'planet') ? <AiFillStar /> : <AiOutlineStar />}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};