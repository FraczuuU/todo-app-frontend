import React from 'react'
import { Input, Button } from 'antd'

import toaster from 'toasted-notes'
import 'toasted-notes/src/styles.css'

import { editTodo } from '../../redux/actions/todo'
import { changeContent } from '../../redux/actions/dashboard'
import { connect } from 'react-redux'

import './EditTodo.css'

class EditTodo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: this.props.todoTitle,
            description: this.props.todoDescription
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
            this.props.editTodo(this.props.todoID, this.state.title, this.state.description)
            toaster.notify('Successfully edited todo', { duration: 1000 })
            this.props.changeContent(this.props.previous)
    }

    render() {
        const { TextArea } = Input
        return (
            <div className="EditTodo">
                <header className="EditTodo-Header">Edit Todo</header>
                <div className="wrapper">
                    <div className="container">
                    <TextArea onChange={ (e) => this.handleTitle(e) } placeholder={ this.props.todoTitle } autosize />
                        <div style={{ margin: '24px 0' }} />
                    <TextArea
                        onChange={ (e) => this.handleDescription(e) }
                        placeholder={ this.props.todoDescription }
                        autosize={{ minRows: 4}}
                    />

                    <Button 
                        type="primary" 
                        className="EditTodo-Button" 
                        onClick={ () => this.handeButton() }>
                        Edit Todo
                    </Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        todoID: state.todoReducer.todoID,
        todoTitle: state.todoReducer.todoTitle,
        todoDescription: state.todoReducer.todoDescription,
        previous: state.dashboardReducer.previous
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        changeContent: (content) => dispatch(changeContent(content)),
        editTodo: (id, title, description) => dispatch(editTodo(id, title, description))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo)