import React from 'react';

export default function Pagination(props) {
	if (props.data !== null) {
		console.log('props data???' + props.data.previous);
		return (
			<React.Fragment>
				(
				<div className="center">
					<div className="pagination">
						<a href={props.data.previous} className="previous" onClick={props.handlePreviousClick}>
							&laquo;
						</a>
						<a href={props.data.next} className="next" onClick={props.handleNextClick}>
							&raquo;
						</a>
					</div>
				</div>
				)
			</React.Fragment>
		);
	} else return null;
}
