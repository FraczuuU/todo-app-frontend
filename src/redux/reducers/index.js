import { combineReducers } from 'redux'

import loginReducer from './loginReducer'
import messagesReducer from './messagesReducer'
import registerReducer from './registerReducer'

const rootReducer = combineReducers({
    loginReducer,
    messagesReducer,
    registerReducer
})


export default rootReducer