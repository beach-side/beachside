import {createStore} from 'redux'
import authReducer from './authReducer'
import {composeWithDevTools} from 'redux-devtools-extension'

// const rootReducer = combineReducers({
//     authReducer
// })

export default createStore(authReducer, composeWithDevTools())