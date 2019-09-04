import React from 'react';

export default function Tile(props) {
	return (
		<div>
			<div className="one-pokemon">
				<img src={this.state.beers.image_url} alt="" className="beer-image" />
				<div className="beer-info">
					<h1>{this.state.beers.name}</h1>
					<p className="headline">{this.state.beers.tagline}</p>
					<p className="creator">{this.state.beers.description}</p>
				</div>
			</div>
		</div>
	);
}
