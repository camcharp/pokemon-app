import React, { Component } from 'react';
import axios from 'axios';

export default class Tile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pokemon: [],
			frontCard: true
		};
		this.displayPokemonDetails = this.displayPokemonDetails.bind(this);
		
	}

	componentDidMount() {
		axios.get(`${this.props.data.url}`).then((res) => {
			this.setState({ pokemon: res.data });
		});
	}

	displayPokemonDetails() {
		this.setState({ frontCard: !this.state.frontCard });
	}

	render() {
		const pokemon = this.state.pokemon;
		return (
			<div className="pokemon-card-container" onClick={this.displayPokemonDetails}>
				{this.state.frontCard && (
					<div className="pokemon-card">
						<div className="background">
							{pokemon.sprites ? <img src={pokemon.sprites.front_default} alt="pokemon-sprite" /> : null}
						</div>
						<div className="content">
							<h1 className="pokemon-name">{pokemon.name}</h1>
							{pokemon.types ? <p className="pokemon-type">{pokemon.types[0].type.name} </p> : null}
						</div>
						<div className="pokemon-stats">
							<p>Power: 74</p>
							<p>Damage: 78</p>
							<p>Attack: electro ball</p>
							<p>Friendly:81</p>
						</div>
					</div>
				)}
				{!this.state.frontCard && (
					<div className="pokemon-card">
						<div className="background">
							{pokemon.sprites ? <img src={pokemon.sprites.front_default} alt="pokemon-sprite" /> : null}
						</div>
						<div className="content">
							<h1 className="pokemon-name">{pokemon.name}</h1>
							{pokemon.types ? <p className="pokemon-type">{pokemon.types[0].type.name} </p> : null}
						</div>
						<div className="pokemon-stats">
							<p>BACK SIDE</p>
						</div>
					</div>
				)}
			</div>
		);
	}
}
