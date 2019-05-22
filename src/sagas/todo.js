import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { TODO } from '../redux/constants'
import { showTodos, getTodos } from '../redux/actions/todo'
import { showMessage } from '../redux/actions/messages'
import { apiURL } from './index'
import { getToken } from '../services/auth'

function* getTodosSaga() {
    try {
        const res = yield call(axios.get, apiURL + '/todo', { 
            'headers': {
                'Authorization': 'Bearer ' + getToken()
            }
        })
        
        if(res.data.todos) {
            yield put(showTodos(res.data.todos))
        } else
            yield put(showMessage(res.data.error))
        
    } catch(err) {
        console.log('Login Request Error:', err)
        yield put(showMessage('An error occured, try again later!'))
    }
}

function* addTodoSaga(action) {
    try {
        const res = yield call(axios.post, apiURL + '/todo', action.payload.todo, { 
            'headers': {
                'Authorization': 'Bearer ' + getToken()
            }
        })
        
        if(res.data.todos[0]) {
            return({})
        } else
            yield put(showMessage(res.data.error))
        
    } catch(err) {
        console.log('Login Request Error:', err)
        yield put(showMessage('An error occured, try again later!'))
    }
}

function* checkTodoSaga(action) {
    try {
        const res = yield call(axios.patch, apiURL + '/todo/check', { id: action.payload.id }, { 
            'headers': {
                'Authorization': 'Bearer ' + getToken()
            }
        })
        if(res.data.todos[0]) {
            yield put(getTodos())
        } else
            yield put(showMessage(res.data.error))
        
    } catch(err) {
        console.log('Login Request Error:', err)
        yield put(showMessage('An error occured, try again later!'))
    }
}

function* editTodoSaga(action) {
    try {
        const res = yield call(axios.patch, apiURL + '/todo', { id: action.payload.todo }, { 
            'headers': {
                'Authorization': 'Bearer ' + getToken()
            }
        })
        
        if(res.data.todos[0]) {
            return({})
        } else
            yield put(showMessage(res.data.error))
        
    } catch(err) {
        console.log('Login Request Error:', err)
        yield put(showMessage('An error occured, try again later!'))
    }
}

function* removeTodoSaga(action) {
    try {
        const res = yield call(axios.delete, apiURL + '/todo?id=' + action.payload.id, { 
            'headers': {
                'Authorization': 'Bearer ' + getToken()
            }
        })
        if(res.data.message) {
            yield put(getTodos())
        } else
            yield put(showMessage(res.data.error))
        
    } catch(err) {
        console.log('Login Request Error:', err)
        yield put(showMessage('An error occured, try again later!'))
    }
}

export function* getTodosSagaWatcher() {
    yield takeLatest(TODO.GETALL, getTodosSaga)
}

export function* addTodoSagaWatcher() {
    yield takeLatest(TODO.ADD, addTodoSaga)
}

export function* checkTodoSagaWatcher() {
    yield takeLatest(TODO.CHECK, checkTodoSaga)
}

export function* editTodoSagaWatcher() {
    yield takeLatest(TODO.EDIT, editTodoSaga)
}

export function* removeTodoSagaWatcher() {
    yield takeLatest(TODO.REMOVE, removeTodoSaga)
}