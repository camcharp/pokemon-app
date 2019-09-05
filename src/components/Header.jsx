import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
	render() {
		return (
			<div className="header">
				<NavLink to="/" activeClassName="hurray">
					<h2>Pokemons</h2>
				</NavLink>
				<NavLink to="/fav" activeClassName="hurray">
					<h2>Your favourites</h2>
				</NavLink>
			</div>
		);
	}
}
