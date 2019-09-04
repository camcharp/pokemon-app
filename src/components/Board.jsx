import React, { Component } from 'react';
import Tile from './Tile';
import axios from 'axios';

export default class Board extends Component {
	state = {
		pokemons: []
	};

	componentDidMount() {
		axios.get(`https://pokeapi.co/api/v2/pokemon`).then((res) => {
			this.setState({ pokemons :res.data.results });
		});
	}

	render() {
		return <ul>{this.state.pokemons.map((person,index) => <li key={index}>{person.name}</li>)}</ul>;
	}
}
