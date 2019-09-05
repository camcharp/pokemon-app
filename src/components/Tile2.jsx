import React, { Component } from 'react';
import axios from 'axios';

export default class Tile2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pokemon: [],
			frontCard: true,
			cardClasses: [ 'card' ]
		};
		this.flipCard = this.flipCard.bind(this);
	}

	componentDidMount() {
		axios.get(`${this.props.data.url}`).then((res) => {
			this.setState({ pokemon: res.data });
		});
	}

	flipCard() {
		this.setState({ frontCard: !this.state.frontCard });
		if (this.state.frontCard === true) this.setState({ cardClasses: [ 'card', 'flipped' ] });
		else this.setState({ cardClasses: [ 'card' ] });
	}

	render() {
		const pokemon = this.state.pokemon;
		let cardClasses = this.state.cardClasses.join(' ');
		return (
			<div className={cardClasses} onClick={this.flipCard}>
				{this.state.frontCard && (
					<div className="face front">
						{pokemon.sprites ? <img src={pokemon.sprites.front_default} alt="pokemon-sprite" /> : null}

						<h1 className="pokemon-name">{pokemon.name}</h1>
						{pokemon.types ? <p className="pokemon-type">{pokemon.types[0].type.name} </p> : null}

						<div className="pokemon-stats" />
					</div>
				)}
				{!this.state.frontCard && (
					<div className="face back">
						{pokemon.sprites ? (
							<div className="img-back">
								<img src={pokemon.sprites.front_default} alt="pokemon-sprite" />
								<img src={pokemon.sprites.back_default} alt="pokemon-sprite" />
							</div>
						) : null}
						<h1 className="pokemon-name">{pokemon.name}</h1>
						{pokemon.types ? <p className="pokemon-type">{pokemon.types[0].type.name} </p> : null}

						<div className="pokemon-stats">
							{pokemon.stats ? (
								pokemon.stats.map((stat) => (
									<p className="stats-name" key={stat.stat.name}>
										<p>{stat.stat.name}:</p> <p className="stats-base">{stat.base_stat}</p>
									</p>
								))
							) : null}
						</div>
					</div>
				)}
			</div>
		);
	}
}
