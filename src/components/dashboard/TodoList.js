import React from 'react'
import { List, Card, Icon } from 'antd'

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
        this.props.changeContent('edit')
    }

    removeTodo(id) {
        this.props.removeTodo(id)
    }

    render() {
        const data = this.props.todos
        return (
            <div className="TodoList">
                <header className="TodoList-Header">Todo List</header>                
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

                                { todo.description }
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