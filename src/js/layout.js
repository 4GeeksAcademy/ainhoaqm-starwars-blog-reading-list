import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import injectContext from "./store/appContext";

//views
import { Home } from "./views/home";
import { CharacterSingle } from "./views/characterSingle";
import { PlanetSingle } from "./views/planetSingle";
import { StarshipSingle } from "./views/starshipSingle";
import { Favorites} from "./views/favorites";

//components
import { Navbar } from "./component/navbar";

const Layout = () => {

	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/single-character/:uid" element={<CharacterSingle />} />
						<Route path="/single-planet/:uid" element={<PlanetSingle />} />
						<Route path="/single-starship/:uid" element={<StarshipSingle />} />
						<Route path="/favorites" element={<Favorites />} />
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
