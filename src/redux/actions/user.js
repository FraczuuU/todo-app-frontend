import { USER } from '../constants'

export const changeUsername = (username, password) => ({
    type: USER.CHANGE_USERNAME,
    payload: { username: username, password: password }
})

export const changeEmail = (email, password) => ({
    type: USER.CHANGE_EMAIL,
    payload: { email: email, password: password }
})

export const changePassword = (newPassword, password) => ({
    type: USER.CHANGE_PASSWORD,
    payload: { newPassword: newPassword, password: password }
})

export const getProfile = () => ({
    type: USER.GET_PROFILE
})

export const showProfile = (username, email) => ({
    type: USER.SHOW_PROFILE,
    payload: { username: username, email: email }
})

