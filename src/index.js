import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Board from './components/Board';
import FavouritePokemons from './components/FavouritePokemons';
import * as serviceWorker from './serviceWorker';
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(
	<BrowserRouter>
		<App />
		<Route exact path="/" render={(props) => <Board {...props} view={1} />} />
		<Route exact path="/fav" render={(props) => <Board {...props} view={2} />} />
	</BrowserRouter>,
	document.getElementById('root')
);

serviceWorker.unregister();
