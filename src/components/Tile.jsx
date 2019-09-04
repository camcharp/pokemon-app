import React, { Component } from 'react';
import axios from 'axios';

export default class Tile extends Component {
	state = {
		pokemon: []
	};

	componentDidMount() {
		axios.get(`${this.props.data.url}`).then((res) => {
			this.setState({ pokemon: res.data });
		});
	}

	render() {
		const pokemon = this.state.pokemon;
		return (
			<div className="pokemon-card-container">
				<div className="pokemon-card">
					<div className="background">
						{this.state.pokemon.sprites ? <img src={pokemon.sprites.front_default} alt="pokemon" /> : null}
					</div>
					<div className="content">
						<h1 className="pokemon-name">{pokemon.name}</h1>
						<span className="pokemon-type" />
					</div>
					<div className="pokemon-stats">
						<p>Power: 74</p>
						<p>Damage: 78</p>
						<p>Attack: electro ball</p>
						<p>Friendly:81</p>
					</div>
				</div>
			</div>
		);
	}
}
