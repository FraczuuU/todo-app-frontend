import { USER } from '../constants'

const userReducer = (state = { username: 'username', email: 'email' }, action) => {

    if(action.type === USER.SHOW_PROFILE) {
        return { ...state, username: action.payload.username, email: action.payload.email }
    }

    return state
}

export default userReducer