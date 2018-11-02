import { createStore, applyMiddleware, compose } from 'redux';
// thunk is a piece of middleware
import thunk from 'redux-thunk';
// rootReducer is a combination of all reducers
import rootReducer from './reducers';

//initial state, set to an empty object
const initialState = {};

//All usable middleware passed into an array
const middleware = [thunk];

// store created here
// createStore takes in the root reducer, initial state, and the compose function.
// compose gets passed applyMiddleware passed in all middleware, and the reduxx dev tools code. 
const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

// export to be used in App.js
export default store;

