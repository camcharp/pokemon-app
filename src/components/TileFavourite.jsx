import React, { Component } from 'react';

export default class TileFavourite extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pokemon: [], // pokemon de la carte
			frontCard: true,
			cardClasses: [ 'card' ]
		};
		this.flipCard = this.flipCard.bind(this);
	}

	flipCard() {
		this.setState({ frontCard: !this.state.frontCard });
		if (this.state.frontCard === true) this.setState({ cardClasses: [ 'card', 'flipped' ] });
		else this.setState({ cardClasses: [ 'card' ] });
	}

	componentDidMount() {
		this.setState({ pokemon: this.props.data });
	}

	render() {
		const pokemon = this.state.pokemon;
		let cardClasses = this.state.cardClasses.join(' ');
		return (
			<div className="card-plus-heart">
				<div className={cardClasses} onClick={this.flipCard}>
					{/* carte vue de face + vérifier que les informations sont chargées */}
					{pokemon.sprites &&
					pokemon.types &&
					pokemon.stats &&
					pokemon.moves &&
					this.state.frontCard && (
						<div className="face front">
							<img src={pokemon.sprites.front_default} alt="pokemon-sprite" />
							<h1 className="pokemon-name">{pokemon.name}</h1>
							<p className="pokemon-type">{pokemon.types[0].type.name} </p>
							<div className="pokemon-stats" />
						</div>
					)}
					{/* carte vue de dos */}
					{!this.state.frontCard && (
						<div className="face back">
							<div className="img-back">
								<img src={pokemon.sprites.front_default} alt="pokemon-sprite" />
								<img src={pokemon.sprites.back_default} alt="pokemon-sprite-back" />
							</div>
							<h1 className="pokemon-name">{pokemon.name}</h1>
							<p className="pokemon-type">{pokemon.types[0].type.name} </p>
							<div className="pokemon-stats">
								{pokemon.stats.map((stat) => (
									<div className="stats-name" key={stat.stat.name}>
										<p>{stat.stat.name}</p> <p className="stats-base">{stat.base_stat}</p>
									</div>
								))}
							</div>
							<div className="pokemon-move">
								<p className="move">special move: {pokemon.moves[0].move.name}</p>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}
