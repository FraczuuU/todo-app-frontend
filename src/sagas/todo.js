import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { TODO } from '../redux/constants'
import { showTodos, getTodos, goToEdit, ready } from '../redux/actions/todo'
import { showMessage } from '../redux/actions/messages'
import { apiURL } from './index'
import { getToken } from '../services/auth'

function* getAllTodosSaga() {
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
        console.log('Error:', err)
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
            yield put(showTodos())
        } else
            yield put(showMessage(res.data.error))
        
    } catch(err) {
        console.log('Error:', err)
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
        console.log('Error:', err)
        yield put(showMessage('An error occured, try again later!'))
    }
}

function* editTodoSaga(action) {
    try {
        const res = yield call(axios.patch, apiURL + '/todo', { 
            id: action.payload.id,
            title: action.payload.title,
            description: action.payload.description,
            planDate: action.payload.planDate
        }, { 
            'headers': {
                'Authorization': 'Bearer ' + getToken()
            }
        })
        
        if(res.data.message) {
            return({})
        } else
            yield put(showMessage(res.data.error))
        
    } catch(err) {
        console.log('Error:', err)
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
        console.log('Error:', err)
        yield put(showMessage('An error occured, try again later!'))
    }
}


function* getOneTodoSaga(action) {
    try {
        const res = yield call(axios.get, apiURL + '/todo/one?id=' + action.payload.id, { 
            'headers': {
                'Authorization': 'Bearer ' + getToken()
            }
        })
        if(res.data.todo) {
            yield put(goToEdit(res.data.todo.id, res.data.todo.title, res.data.todo.description, res.data.todo.planDate))
            yield put(ready())
        } else
            yield put(showMessage(res.data.error))
        
    } catch(err) {
        console.log('Error:', err)
        yield put(showMessage('An error occured, try again later!'))
    }
}

export function* getAllTodosSagaWatcher() {
    yield takeLatest(TODO.GETALL, getAllTodosSaga)
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

export function* getOneTodoSagaWatcher() {
    yield takeLatest(TODO.GET_ONE, getOneTodoSaga)
}