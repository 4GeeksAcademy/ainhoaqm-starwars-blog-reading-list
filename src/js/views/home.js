import React from "react";
import "../../styles/home.css";

//components
import { Characters } from "../component/characters";
import { Planets } from "../component/planets";
import { Starships } from "../component/starships"; 

export const Home = () => (
	<div className="container body">
		<div>
			<h1 className="h1">Characters</h1>
			<Characters/>
		</div>
 		<div>
			<h1 className="h1">Planets</h1>
			<Planets/>
		</div>
		<div>
			<h1 className="h1">Starships</h1>
			<Starships/>
		</div>
	</div>
);
