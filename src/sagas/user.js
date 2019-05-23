import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { USER } from '../redux/constants'
import { showMessage } from '../redux/actions/messages'
import { showProfile, getProfile } from '../redux/actions/user'
import { apiURL } from './index'
import { getToken } from '../services/auth'

function* changeUsernameSaga(action) {
    try {
        const res = yield call(axios.patch, apiURL + '/user/username', action.payload, { 
            'headers': {
                'Authorization': 'Bearer ' + getToken()
            }
        })

        if(res.data.message) {
            yield put(getProfile())
            yield put(showMessage(res.data.message))
        } else
            yield put(showMessage(res.data.error))
        
    } catch(err) {
        console.log('Login Request Error:', err)
        yield put(showMessage('An error occured, try again later!'))
    }
}

function* changeEmailSaga(action) {
    try {
        const res = yield call(axios.patch, apiURL + '/user/email', action.payload, { 
            'headers': {
                'Authorization': 'Bearer ' + getToken()
            }
        })
        
        if(res.data.message) {
            yield put(getProfile())
            yield put(showMessage(res.data.message))
        } else
            yield put(showMessage(res.data.error))
        
    } catch(err) {
        console.log('Login Request Error:', err)
        yield put(showMessage('An error occured, try again later!'))
    }
}

function* changePasswordSaga(action) {
    try {
        const res = yield call(axios.patch, apiURL + '/user/password', action.payload, { 
            'headers': {
                'Authorization': 'Bearer ' + getToken()
            }
        })
        
        if(res.data.message) {
            yield put(getProfile())
            yield put(showMessage(res.data.message))
        } else
            yield put(showMessage(res.data.error))
        
    } catch(err) {
        console.log('Login Request Error:', err)
        yield put(showMessage('An error occured, try again later!'))
    }
}

function* getProfileSaga(action) {
    try {
        const res = yield call(axios.get, apiURL + '/user', { 
            'headers': {
                'Authorization': 'Bearer ' + getToken()
            }
        })

        if(res.data.username) {
            yield put(showProfile(res.data.username, res.data.email))
        } else
            yield put(showMessage(res.data.error))
        
    } catch(err) {
        console.log('Login Request Error:', err)
        yield put(showMessage('An error occured, try again later!'))
    }
}

export function* changeUsernameSagaWatcher() {
    yield takeLatest(USER.CHANGE_USERNAME, changeUsernameSaga)
}

export function* changeEmailSagaWatcher() {
    yield takeLatest(USER.CHANGE_EMAIL, changeEmailSaga)
}

export function* changePasswordSagaWatcher() {
    yield takeLatest(USER.CHANGE_PASSWORD, changePasswordSaga)
}

export function* getProfileSagaWatcher() {
    yield takeLatest(USER.GET_PROFILE, getProfileSaga)
}