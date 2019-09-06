import React from 'react';

export default function Pagination(props) {
	if (props.data !== null) {
		return (
			<React.Fragment>
				<div className="center">
					<div className="pagination">
						<a href={props.data.previous} className="previous" onClick={props.handlePreviousClick}>
							&laquo; Previous Pokemons
						</a>
						<a href={props.data.next} className="next" onClick={props.handleNextClick}>
							Next Pokemons &raquo; 
						</a>
					</div>
				</div>
			</React.Fragment>
		);
	} else return null;
}
