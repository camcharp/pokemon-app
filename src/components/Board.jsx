import React, { Component } from 'react';
import Tile2 from './Tile2';
import Pagination from './Pagination';
import axios from 'axios';

export default class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pokemons: [],
			next: null,
			previous: null
		};
		this.handlePreviousClick = this.handlePreviousClick.bind(this);
		this.handleNextClick = this.handleNextClick.bind(this);
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
					{this.state.pokemons.map((pokemon, index) => <Tile2 key={pokemon.name} data={pokemon} />)}
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
