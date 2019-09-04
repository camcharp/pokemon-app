import React, { Component } from 'react';
import Tile from './Tile';
import axios from 'axios';

export default class Board extends Component {
	state = {
		pokemons: []
	};

	componentDidMount() {
		axios.get(`https://pokeapi.co/api/v2/pokemon`).then((res) => {
			this.setState({ pokemons: res.data.results });
		});
	}

	render() {
		return (
			<div className="big-container">
				{this.state.pokemons.map((pokemon, index) => <Tile key={index} data={pokemon} />)}
			</div>
		);
	}
}
