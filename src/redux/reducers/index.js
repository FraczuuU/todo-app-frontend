import { combineReducers } from 'redux'

import loginReducer from './loginReducer'
import messagesReducer from './messagesReducer'
import registerReducer from './registerReducer'
import todoReducer from './todoReducer'
import dashboardReducer from './dashboardReducer'

const rootReducer = combineReducers({
    loginReducer,
    messagesReducer,
    registerReducer,
    todoReducer,
    dashboardReducer
})


export default rootReducer