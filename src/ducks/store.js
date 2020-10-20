import {createStore} from 'redux'
import authReducer from './authReducer'

// const rootReducer = combineReducers({
//     authReducer
// })

export default createStore(authReducer)