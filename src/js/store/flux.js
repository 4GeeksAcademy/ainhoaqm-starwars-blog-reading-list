const getState = ({ getStore, getActions, setStore }) => {
	const favoritesFromLocalStorage = JSON.parse(localStorage.getItem('favorites')) || [];
	
	return {
		store: {
			favorites: favoritesFromLocalStorage,
			characterFavorites: favoritesFromLocalStorage.filter(item => item.category === 'character'),
			planetFavorites: favoritesFromLocalStorage.filter(item => item.category === 'planet'),
			starshipFavorites: favoritesFromLocalStorage.filter(item => item.category === 'starship'),
		},
		actions: {
			addToFavorites: (item, category) => {
				const store = getStore();
				const isAlreadyFavorite = store.favorites.some((fav) => fav.uid === item.uid && fav.category === category);
			  
				if (!isAlreadyFavorite) {
				  const newFavorite = { ...item, category };
			  
				  // Utilizar un conjunto (Set) para eliminar duplicados
				  const updatedFavoritesSet = new Set([...store.favorites, newFavorite]);
				  const updatedFavoritesArray = Array.from(updatedFavoritesSet);
			  
				  setStore({
					favorites: updatedFavoritesArray,
					characterFavorites: updatedFavoritesArray.filter(item => item.category === 'character'),
					planetFavorites: updatedFavoritesArray.filter(item => item.category === 'planet'),
					starshipFavorites: updatedFavoritesArray.filter(item => item.category === 'starship'),
				  });
			  
				  localStorage.setItem('favorites', JSON.stringify(updatedFavoritesArray));
				}
			},
			
			removeFavorite: (fav) => {
				const store = getStore();
				const updatedArray = store.favorites.filter((favorite) => favorite.uid !== fav.uid);
				
				setStore({
				  favorites: updatedArray,
				  characterFavorites: updatedArray.filter(item => item.category === 'character'),
				  planetFavorites: updatedArray.filter(item => item.category === 'planet'),
				  starshipFavorites: updatedArray.filter(item => item.category === 'starship'),
				});
			  
				localStorage.setItem('favorites', JSON.stringify(updatedArray));
			},
		},
	};
};
  
export default getState;