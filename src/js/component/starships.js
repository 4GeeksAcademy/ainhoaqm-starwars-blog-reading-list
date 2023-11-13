import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

//icons
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export const Starships = () => {
  const { store, actions } = useContext(Context);
  const isFavorite = (uid, category) => store.favorites.some((fav) => fav.uid === uid && fav.category === category);
  const handleFavoritesClick = (item) => {
    const category = 'starship';
    if (isFavorite(item.uid, category)) {
      actions.removeFavorite(item);
    } else {
      actions.addToFavorites(item, category);
    }
  };

  const urlApiStarships = "https://www.swapi.tech/api/starships";
  const imgUrl = "https://starwars-visualguide.com/assets/img/starships/";

  const [starships, setStarships] = useState([])

  const getAllelements = async () => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const response = await fetch(urlApiStarships, requestOptions);
    const data = await response.json();
    setStarships(data.results);
    console.log (data.results);
  };

  useEffect(() => {
    getAllelements();
  },[]);

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
    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
      {starships.map((item, index) => (
        <div key={index} className="col mb-4">
          <div className="card">
          <img src={getStarshipImage(item.uid)} className="card-img-top" alt="img starships"
              style={{ objectFit: 'cover', width: '100%', height: '203px',}}/>
            <div className="card-body" style={{ height: '89px'}}>
              <h5 className="card-title">
                <strong>{item.name}</strong>
              </h5>
              <p className="card-text"></p>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
              <Link to={"/single-starship/" + item.uid}>
                <button className="btn btn-primary" type="button">
                  Learn more!
                </button>
              </Link>
              <button onClick={() => handleFavoritesClick(item)} className="btn btn-warning ms-1" type="button"> 
                {isFavorite(item.uid, 'starship') ? <AiFillStar /> : <AiOutlineStar />}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};