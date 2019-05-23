import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { showMessage } from '../redux/actions/messages'
import { invalidToken, resetToken } from '../redux/actions/forgot-password'
import { FORGOT_PASSWORD } from '../redux/constants'
import { apiURL } from './index'

function* sendForgotPasswordEmailSaga(action) {
    try {
        const res = yield call(axios.post, apiURL + '/forgot-password', { 
            email: action.payload.email
        })
        
        if(res.data.message) {
            yield put(showMessage(res.data.message))
        } else
            yield put(showMessage(res.data.error))
        
    } catch(err) {
        console.log('Error:', err)
        yield put(showMessage('An error occured, try again later!'))
    }
}

export function* resetPasswordSaga(action) {

    try {
        const res = yield call(axios.post, apiURL + '/reset-password/' + action.payload.token,
        { password: action.payload.password })

        if(res.data.message) {
            yield put(showMessage(res.data.message))
            yield put(resetToken())
        } else 
            yield put(showMessage(res.data.error))

    } catch(err) {
        console.log('Error:', err)
        yield put(showMessage('An error occured, try again later!'))
    }

}

export function* checkResetTokenSaga(action) {

    try {
        const res = yield call(axios.get, apiURL + '/reset-password/' + action.payload.token)
        if(res.data.message) {
            return({})
        } else 
            yield put(invalidToken())
            
    } catch(err) {
        console.log('Error:', err)
        yield put(invalidToken())
    }

}

export function* sendForgotPasswordEmailSagaWatcher() {
    yield takeLatest(FORGOT_PASSWORD.SEND_EMAIL, sendForgotPasswordEmailSaga)
}

export function* resetPasswordSagaWatcher() {
    yield takeLatest(FORGOT_PASSWORD.RESET_PASSWORD, resetPasswordSaga)
}

export function* checkResetTokenSagaWatcher() {
    yield takeLatest(FORGOT_PASSWORD.CHECK_TOKEN, checkResetTokenSaga)
}