import React, { Component } from 'react';
import Tile from './Tile';
import Pagination from './Pagination';
import axios from 'axios';

export default class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pokemons: [],
			likedPokemons: [],
			next: null,
			previous: null
		};
		this.handlePreviousClick = this.handlePreviousClick.bind(this);
		this.handleNextClick = this.handleNextClick.bind(this);
		this.addFavouritePokemon = this.addFavouritePokemon.bind(this);
		this.removeFavouritePokemon = this.removeFavouritePokemon.bind(this);
	}

	componentDidMount() {
		axios.get(`https://pokeapi.co/api/v2/pokemon`).then((res) => {
			this.setState({ pokemons: res.data.results, next: res.data.next, previous: res.data.previous });
		});
	}

	getNewPokemons(res) {
		this.setState({ pokemons: res.data.results, next: res.data.next, previous: res.data.previous });
	}

	handlePreviousClick(e) {
		e.preventDefault();
		axios.get(this.state.previous).then((res) => this.getNewPokemons(res));
		this.setState({ state: this.state });
	}

	handleNextClick(e) {
		e.preventDefault();
		axios.get(this.state.next).then((res) => this.getNewPokemons(res));
		this.setState({ state: this.state });
	}

	addFavouritePokemon = (e, pokemon) => {
		e.preventDefault();
		let likedPokemonsCopy = [ ...this.state.likedPokemons ];
		if (!likedPokemonsCopy.includes(pokemon)) likedPokemonsCopy.push(pokemon);
		this.setState({ likedPokemons: likedPokemonsCopy });
	};

	removeFavouritePokemon = (e, pokemon) => {
		e.preventDefault();
		let likedPokemonsCopy = [ ...this.state.likedPokemons ];
		let index = likedPokemonsCopy.indexOf(pokemon); // find pokemon in array
		if (index > -1) likedPokemonsCopy.splice(index, 1);
		this.setState({ likedPokemons: likedPokemonsCopy });
	};

	render() {
		console.log(this.state);
		return (
			<React.Fragment>
				<Pagination
					data={this.state}
					handlePreviousClick={this.handlePreviousClick}
					handleNextClick={this.handleNextClick}
				/>
				<div className="big-container">
					{this.state.pokemons.map((pokemon) => (
						<Tile
							key={pokemon.name}
							data={pokemon}
							addFavouritePokemon={this.addFavouritePokemon}
							removeFavouritePokemon={this.removeFavouritePokemon}
						/>
					))}
				</div>
				<Pagination
					data={this.state}
					handlePreviousClick={this.handlePreviousClick}
					handleNextClick={this.handleNextClick}
				/>
			</React.Fragment>
		);
	}
}
