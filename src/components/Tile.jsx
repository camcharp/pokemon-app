import React, { Component } from 'react';
import axios from 'axios';

export default class Tile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pokemon: [],
			frontCard: true,
			cardClasses: [ 'card' ],
			liked: false
		};
		this.flipCard = this.flipCard.bind(this);
		this.handleFavourite = this.handleFavourite.bind(this);
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

	handleFavourite = (e) => {
		console.log('handleFavourite called');
		if (this.state.liked) {
			this.props.removeFavouritePokemon(e, this.state.pokemon);
			this.setState({ liked: false });
		} else {
			this.props.addFavouritePokemon(e, this.state.pokemon);
			this.setState({ liked: true });
		}
	};

	render() {
		const pokemon = this.state.pokemon;
		let cardClasses = this.state.cardClasses.join(' ');
		return (
			<React.Fragment>
				{this.state.liked ? (
					<i className="fa fa-heart" onClick={this.handleFavourite} />
				) : (
					<i className="fa fa-heart-o" onClick={this.handleFavourite} />
				)}

				<div className={cardClasses} onClick={this.flipCard}>
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
					{!this.state.frontCard && (
						<div className="face back">
							<div className="img-back">
								<img src={pokemon.sprites.front_default} alt="pokemon-sprite" />
								<img src={pokemon.sprites.back_default} alt="pokemon-sprite" />
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
								{pokemon.moves ? (
									<p className="move">special move: {pokemon.moves[0].move.name}</p>
								) : null}
							</div>
						</div>
					)}
				</div>
			</React.Fragment>
		);
	}
}
