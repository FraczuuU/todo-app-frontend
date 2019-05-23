import { combineReducers } from 'redux'

import loginReducer from './loginReducer'
import messagesReducer from './messagesReducer'
import registerReducer from './registerReducer'
import todoReducer from './todoReducer'
import dashboardReducer from './dashboardReducer'
import userReducer from './userReducer'
import forgotPasswordReducer from './forgotPasswordReducer'

const rootReducer = combineReducers({
    loginReducer,
    messagesReducer,
    registerReducer,
    todoReducer,
    dashboardReducer,
    userReducer,
    forgotPasswordReducer
})


export default rootReducer