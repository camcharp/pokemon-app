import React, { Component } from 'react';
import axios from 'axios';

// components
import Header from './Header';
import Pagination from './Pagination';
import Tile from './Tile';
import TileFavourite from './TileFavourite';

export default class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pokemons: [],
			likedPokemons: [],
			next: null,
			previous: null,
			view: 1 // "page" Pokemons:1, "page" Favoris:2
		};
		this.getNewPokemons = this.getNewPokemons.bind(this);
		this.changeView = this.changeView.bind(this);
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

	changeView(e) {
		e.preventDefault();
		if (this.state.view === 1) {
			this.setState({ view: 2 }); // page Favoris
		} else if (this.state.view === 2) {
			this.setState({ view: 1 }); // page Pokemons
		}
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

	componentDidMount() {
		axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`).then((res) => {
			this.setState({ pokemons: res.data.results, next: res.data.next, previous: res.data.previous });
			this.getNewPokemons(res);
		});
	}

	render() {
		return (
			<div className="page-wrapper">
				<Header changeView={this.changeView} />
				{this.state.view === 1 && (
					<Pagination
						data={this.state}
						handlePreviousClick={this.handlePreviousClick}
						handleNextClick={this.handleNextClick}
					/>
				)}
				<div className="big-container">
					{/* Page Pokemons */}
					{this.state.view === 1 &&
						this.state.pokemons.map((pokemon) => (
							<Tile
								likedPokemons={this.state.likedPokemons}
								key={pokemon.url}
								data={pokemon}
								addFavouritePokemon={this.addFavouritePokemon}
								removeFavouritePokemon={this.removeFavouritePokemon}
							/>
						))}
					{/* Page Favoris */}
					{this.state.view === 2 &&
						this.state.likedPokemons &&
						this.state.likedPokemons.map((pokemon) => (
							<TileFavourite
								likedPokemons={this.state.likedPokemons}
								key={pokemon.name}
								data={pokemon}
								addFavouritePokemon={this.addFavouritePokemon}
								removeFavouritePokemon={this.removeFavouritePokemon}
							/>
						))}
					{/* Page Favoris si l'utilisateur n'a pas encore mis de Pokemon en favori */}
					{this.state.view === 2 &&
					this.state.likedPokemons.length === 0 && (
						<h1 className="no-fav-yet">Sorry, you have no favourite Pokemon yet.</h1>
					)}
				</div>
				{this.state.view === 1 && (
					<Pagination
						data={this.state}
						handlePreviousClick={this.handlePreviousClick}
						handleNextClick={this.handleNextClick}
					/>
				)}
			</div>
		);
	}
}
