var React = require('react');
var ReactDOM = require('react-dom');
var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var createLogger = require('redux-logger');
var thunkMiddleware = require('redux-thunk').default;
var Provider = require('react-redux').Provider;
var reducer = require('./reducers/index').reducer;
var RunStatsApp = require('./components/RunStatsApp').Component;

const loggerMiddleware = createLogger();

const store = createStore(reducer,
		applyMiddleware(thunkMiddleware, loggerMiddleware)
	);

const render = () => {
	//console.log('STATE: ', store.getState());
	ReactDOM.render(
		<Provider store={store}>
  	  		<RunStatsApp />
		</Provider>,
  	  document.getElementById('root')
	);
}

render();