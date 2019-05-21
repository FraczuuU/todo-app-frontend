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

    return state
}

export default loginReducer