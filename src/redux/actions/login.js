import { LOGIN } from '../constants'

export const loginRequest = (username, password, remember) => ({
    type: LOGIN.REQUEST,
    payload: { 
        username: username,
        password: password,
        remember: remember
     }
})

export const loginSuccess = () => ({
    type: LOGIN.SUCCESS
})

export const logout = () => ({
    type: LOGIN.LOGOUT
})