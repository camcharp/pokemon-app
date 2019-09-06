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
		this.getNewPokemons = this.getNewPokemons.bind(this);
		this.handlePreviousClick = this.handlePreviousClick.bind(this);
		this.handleNextClick = this.handleNextClick.bind(this);
		this.addFavouritePokemon = this.addFavouritePokemon.bind(this);
		this.removeFavouritePokemon = this.removeFavouritePokemon.bind(this);
	}

	getNewPokemons(res) {
		this.setState({
			pokemons: res.data.results,
			next: res.data.next,
			previous: res.data.previous
		});
	}

	componentDidMount() {
		axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`).then((res) => {
			this.setState({ pokemons: res.data.results, next: res.data.next, previous: res.data.previous });
			this.getNewPokemons(res);
		});
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
		const likedPokemonsCopy = [ ...this.state.likedPokemons ];
		if (!likedPokemonsCopy.some((p) => p.name === pokemon.name)) likedPokemonsCopy.push(pokemon);
		this.setState({ likedPokemons: likedPokemonsCopy });
	};

	removeFavouritePokemon = (e, pokemon) => {
		e.preventDefault();
		let likedPokemonsCopy = [ ...this.state.likedPokemons ];
		for (let i = 0; i < likedPokemonsCopy.length; i++) {
			if (likedPokemonsCopy[i].name === pokemon.name) {
				likedPokemonsCopy.splice(likedPokemonsCopy[i], 1);
			}
		}
		this.setState({ likedPokemons: likedPokemonsCopy });
	};

	render() {
		return (
			<div className="page-wrapper">
				<Pagination
					data={this.state}
					handlePreviousClick={this.handlePreviousClick}
					handleNextClick={this.handleNextClick}
				/>
				<div className="big-container">
					{this.state.pokemons.map((pokemon) => (
						<Tile
							likedPokemons={this.state.likedPokemons}
							key={pokemon.url}
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
			</div>
		);
	}
}
