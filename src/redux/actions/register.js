import { REGISTER } from '../constants'

export const registerRequest = (username, password, email) => ({
    type: REGISTER.REQUEST,
    payload: { 
        username: username,
        password: password,
        email: email
    }
})

export const registerSuccess = () => ({
    type: REGISTER.SUCCESS
})