import { LOGIN } from '../constants'
import { removeToken } from '../../services/auth'

const loginReducer = (state = {}, action) => {

    if(action.type === LOGIN.SUCCESS) {
        return { ...state, logged: true }
    }

    if(action.type === LOGIN.LOGOUT) {
        removeToken()
        return { ...state, loggedOut: true }
    }

    if(action.type === LOGIN.RESET) {
        return { ...state, loggedOut: false }
    }

    return state
}

export default loginReducer