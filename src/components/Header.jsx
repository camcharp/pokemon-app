import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header(props) {
	return (
		<div className="header">
			<NavLink to="/" activeClassName="hurray" onClick={props.changeView}>
				<h2>Pokemons</h2>
			</NavLink>
			<NavLink to="/fav" activeClassName="hurray" onClick={props.changeView}>
				<h2>Your favourites</h2>
			</NavLink>
		</div>
	);
}
