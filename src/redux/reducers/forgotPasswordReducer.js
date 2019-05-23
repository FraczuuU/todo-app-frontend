import { FORGOT_PASSWORD } from '../constants'

const forgotPasswordReducer = (state = {}, action) => {

    if(action.type === FORGOT_PASSWORD.INVALID_TOKEN) {
        return { ...state, invalidToken: true }
    }

    if(action.type === FORGOT_PASSWORD.RESET_TOKEN) {
        return { ...state, resetToken: true }
    }

    if(action.type === FORGOT_PASSWORD.RESET_TOKEN_REVERSE) {
        return { ...state, resetToken: false }
    }

    if(action.type === FORGOT_PASSWORD.RESET_INVALID_TOKEN) {
        return { ...state, invalidToken: '' }
    }

    return state
}

export default forgotPasswordReducer