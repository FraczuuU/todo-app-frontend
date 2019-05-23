import React from 'react'
import { Input, Button } from 'antd'

import toaster from 'toasted-notes'
import 'toasted-notes/src/styles.css'

import { addTodo, getTodos } from '../../redux/actions/todo'
import { changeContent } from '../../redux/actions/dashboard'
import { connect } from 'react-redux'

import './NewTodo.css'

class NewTodo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: ''
        }

    }

    handleTitle(e) {
        let newTitle = e.target.value
        this.setState({ title: newTitle })
    }

    handleDescription(e) {
        let newDescription = e.target.value
        this.setState({ description: newDescription })
    }

    handeButton() {
            this.props.addTodo(this.state.title, this.state.description)
            this.props.getTodos()
            toaster.notify('Successfully added new todo', { duration: 1000 })
            this.props.changeContent('todos')
    }

    render() {
        const { TextArea } = Input
        return (
            <div className="NewTodo">
                <header className="NewTodo-Header">New Todo</header>
                <div className="wrapper">
                    <div className="container">
                    <TextArea onChange={ (e) => this.handleTitle(e) } placeholder="Title" autosize />
                        <div style={{ margin: '24px 0' }} />
                    <TextArea
                        onChange={ (e) => this.handleDescription(e) }
                        placeholder="Description"
                        autosize={{ minRows: 4}}
                    />
                    <Button 
                        type="primary" 
                        className="NewTodo-Button" 
                        onClick={ () => this.handeButton() }>
                        Add Todo
                    </Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({})
}

const mapDispatchToProps = (dispatch) => {
    return({
        addTodo: (title, description) => dispatch(addTodo({ title: title, description: description })),
        getTodos: () => dispatch(getTodos()),
        changeContent: (content) => dispatch(changeContent(content))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTodo)