import React from 'react'
import { List, Card, Icon } from 'antd'
import moment from 'moment'

import { getTodos, checkTodo, removeTodo, getOne } from '../../redux/actions/todo'
import { changeContent, setPrevious } from '../../redux/actions/dashboard'
import { connect } from 'react-redux'

import './TodoList.css'

class TodoList extends React.Component {

    componentWillMount() {
        this.props.getTodos()
    }

    checkTodo(id) {
        this.props.checkTodo(id)
    }

    editTodo(id) {
        this.props.getOne(id)
        this.props.setPrevious(this.props.content)
    }

    componentDidUpdate() {
        if(this.props.ready) {
            this.props.changeContent('edit')
        }
    }

    removeTodo(id) {
        this.props.removeTodo(id)
    }

    timeDiff(todo) {
        var now = moment(new Date())
        var end = moment(todo.planDate)
        var duration = moment.duration(now.diff(end))
        var days = duration.asDays()
        return days
    }

    refresh() {
        this.props.getTodos()
    }

    render() {
        const data = (this.props.todos || []).sort((a, b) => a.planDate > b.planDate ? 1 : -1)
        const calendarFix = {
            lastDay : '[Yesterday at] HH:mm',
            sameDay : '[Today at] HH:mm',
            nextDay : '[Tomorrow at] HH:mm',
            lastWeek : '[last] dddd [at] HH:mm',
            nextWeek : 'dddd [at] HH:mm',
            sameElse : 'DD/MM/YYYY HH:mm'
        }
        return (
            <div className="TodoList">
                <header className="TodoList-Header">Todo List <Icon onClick={ () => this.refresh() } className="TodoList-Header-Icon" type="reload" /> </header>                
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
                    }}
                    dataSource={ data }
                    renderItem={ todo => (
                        <List.Item>
                            <Card title={ todo.title } 
                                headStyle={(todo.done) ? {'backgroundColor': '#D3FFD7'} : {'': ''} }
                                bodyStyle={(todo.done) ? {'backgroundColor': '#D3FFD7'} : {'': ''} }
                                extra={ 
                                    <div>
                                        <Icon type="check" className={`checkTodo ${ (todo.done) ? 'checked' : '' }`} 
                                        onClick={ () => this.checkTodo(todo._id) } />
                                        <Icon type="edit" className="editTodo" onClick={ () => this.editTodo(todo._id) } />
                                        <Icon type="delete" className="deleteTodo" onClick={ () => this.removeTodo(todo._id) } />
                                    </div>
                                }>
   
                                <p className="todoDescription">{ todo.description }</p>
                               { (todo.imageLocation) ? <img className="todoImage" src={ todo.imageLocation } alt={ todo.title } ></img> : ''}
                                <p className={
                                    `
                                        todoPlanDate
                                        ${ (this.timeDiff(todo) > 0) ? 'expired' : '' }
                                        ${ (this.timeDiff(todo) > -1) ? 'closeToExpiring' : '' }
                                    
                                    `
                                }
                                
                                >{ (todo.planDate) ? moment(todo.planDate).calendar(null, calendarFix) : '' }</p>
                               
                            
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        todos: state.todoReducer.todos,
        ready: state.todoReducer.ready,
        content: state.dashboardReducer.content
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        getTodos: () => dispatch(getTodos()),
        checkTodo: (id) => dispatch(checkTodo(id)),
        removeTodo: (id) => dispatch(removeTodo(id)),
        getOne: (id) => dispatch(getOne(id)),
        changeContent: (content) => dispatch(changeContent(content)),
        setPrevious: (previous) => dispatch(setPrevious(previous))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)