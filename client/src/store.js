import { createStore, applyMiddleware } from 'redux';

// store
const store = createStore(() => [], {}, applyMiddleware());

export default store;

