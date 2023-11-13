import React, { useContext } from "react";
import { Context } from "../store/appContext"; 
import { Link } from 'react-router-dom';

//icons
import { BsTrash3 } from "react-icons/bs";

export const Favorites = () => {
  const { store, actions } = useContext(Context);

  const characterFavorites = store.favorites.filter(item => item.category === 'character');
  const planetFavorites = store.favorites.filter(item => item.category === 'planet');
  const starshipFavorites = store.favorites.filter(item => item.category === 'starship');

  const noFavorites = characterFavorites.length === 0 && planetFavorites.length === 0 && starshipFavorites.length === 0;

  return (
    <div className="container">
      {noFavorites ? (
        <div className="alert alert-info" role="alert">
          ¡Aún no has añadido nada a favoritos!
        </div>
      ) : (
        <>
          {(characterFavorites.length > 0) && (
            <div>
              <h1 className="h1">Characters</h1>
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
                {characterFavorites.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="card">
                      <img src={`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`} className="card-img-top" alt={`img character ${item.name}`} />
                      <div className="card-body" >
                        <h5 className="card-title">
                          <strong>{item.name}</strong>
                        </h5>
                      </div>
                      <div className="card-footer d-flex justify-content-between align-items-center">
                        <Link to={"/single-character/" + item.uid}>
                          <button className="btn btn-primary" type="button">
                            Learn more!
                          </button>
                        </Link>
                        <button onClick={() => actions.removeFavorite(item)} className="btn btn-danger" type="button"> <BsTrash3/> </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {(planetFavorites.length > 0) && (
            <div>
              <h1 className="h1">Planets</h1>
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
                {planetFavorites.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="card">
                      <img src={`https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`} className="card-img-top" alt={`img planet ${item.name}`} />
                      <div className="card-body" >
                        <h5 className="card-title">
                          <strong>{item.name}</strong>
                        </h5>
                      </div>
                      <div className="card-footer d-flex justify-content-between align-items-center">
                        <Link to={"/single-planet/" + item.uid}>
                          <button className="btn btn-primary" type="button">
                            Learn more!
                          </button>
                        </Link>
                        <button onClick={() => actions.removeFavorite(item)} className="btn btn-danger" type="button"> <BsTrash3/> </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {(starshipFavorites.length > 0) && (
            <div>
              <h1 className="h1">Starships</h1>
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
                {starshipFavorites.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="card">
                      <img src={`https://starwars-visualguide.com/assets/img/starships/${item.uid}.jpg`} className="card-img-top" alt={`img starship ${item.name}`} 
                        style={{ objectFit: 'cover', width: '100%', height: '203px',}}/>
                      <div className="card-body" >
                        <h5 className="card-title">
                          <strong>{item.name}</strong>
                        </h5>
                      </div>
                      <div className="card-footer d-flex justify-content-between align-items-center">
                        <Link to={"/single-cstarship/" + item.uid}>
                          <button className="btn btn-primary" type="button">
                            Learn more!
                          </button>
                        </Link>
                        <button onClick={() => actions.removeFavorite(item)} className="btn btn-danger" type="button"> <BsTrash3/> </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};