import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Board from './components/Board';
import * as serviceWorker from './serviceWorker';
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(
	<BrowserRouter>
		<App />
		<Route exact path="/" component={Board} />
		<Route exact path="/fav" component={Board} />
	</BrowserRouter>,
	document.getElementById('root')
);

serviceWorker.unregister();
