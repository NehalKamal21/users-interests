import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import usersReducer from './reducers/users';

const rootReducer = combineReducers({
  users: usersReducer
})


const configreStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk))
}


export default configreStore;