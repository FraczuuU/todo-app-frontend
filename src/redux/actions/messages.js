import { MESSAGES } from '../constants'

export const showMessage = (message) => ({
    type: MESSAGES.SHOW,
    payload: { message: message }
})

export const resetMessage = () => ({
    type: MESSAGES.RESET
})