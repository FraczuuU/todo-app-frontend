import { FORGOT_PASSWORD } from '../constants'

export const sendForgotPassword = (email) => ({
    type: FORGOT_PASSWORD.SEND_EMAIL,
    payload: { 
        email: email
    }
})

export const resetPassword = (token, password) => ({
    type: FORGOT_PASSWORD.RESET_PASSWORD,
    payload: { 
        token: token,
        password: password
    }
})

export const checkToken = (token) => ({
    type: FORGOT_PASSWORD.CHECK_TOKEN,
    payload: { 
        token: token
    }
})

export const resetToken = () => ({
    type: FORGOT_PASSWORD.RESET_TOKEN
})

export const resetTokenReverse = () => ({
    type: FORGOT_PASSWORD.RESET_TOKEN_REVERSE
})

export const invalidToken = () => ({
    type: FORGOT_PASSWORD.INVALID_TOKEN
})

export const resetInvalidToken = () => ({
    type: FORGOT_PASSWORD.RESET_INVALID_TOKEN
})