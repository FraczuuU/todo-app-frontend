import React from 'react'
import { Input, Button, DatePicker } from 'antd'
import moment from 'moment'

import toaster from 'toasted-notes'
import 'toasted-notes/src/styles.css'

import { editTodo, readyReset } from '../../redux/actions/todo'
import { changeContent } from '../../redux/actions/dashboard'
import { connect } from 'react-redux'

import './EditTodo.css'

class EditTodo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: this.props.todoTitle,
            description: this.props.todoDescription,
            planDate: this.props.todoPlanDate
        }

    }

    componentDidMount() {
        this.props.readyReset()
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
            this.props.editTodo(this.props.todoID, this.state.title, this.state.description, this.state.planDate)
            toaster.notify('Successfully edited todo', { duration: 1000 })
            this.props.changeContent(this.props.previous)
    }

    handleplanDate(value, planDate) {
        this.setState({
            planDate: planDate
        })
    }

    goBack() {
        this.props.changeContent(this.props.previous)
    }

    render() {
        const { TextArea } = Input
        return (
            <div className="EditTodo">
                <header className="EditTodo-Header">Edit Todo</header>
                <div className="EditTodo-Wrapper">
                    <div className="EditTodo-Container">
                    <TextArea onChange={ (e) => this.handleTitle(e) } defaultValue={ this.props.todoTitle } autosize />
                        <div style={{ margin: '24px 0' }} />
                    <TextArea
                        onChange={ (e) => this.handleDescription(e) }
                        defaultValue={ this.props.todoDescription }
                        autosize={{ minRows: 4}}
                    />

                    <DatePicker placeholder={  (this.state.planDate) ? moment(this.state.planDate).format('YYYY-MM-DD HH:MM:SS') : 'Select date' } 
                    showTime className="EditTodo-DatePicker" onChange={ (value, planDate) => this.handleplanDate(value, planDate) } />

                    <Button 
                        type="primary" 
                        className="EditTodo-Button" 
                        onClick={ () => this.handeButton() }>
                        Edit Todo
                    </Button>

                    <Button 
                        type="primary" 
                        className="EditTodo-Button" 
                        onClick={ () => this.goBack() }>
                        Go back
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
        todoPlanDate: state.todoReducer.todoPlanDate,
        previous: state.dashboardReducer.previous
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        changeContent: (content) => dispatch(changeContent(content)),
        editTodo: (id, title, description, planDate) => dispatch(editTodo(id, title, description, planDate)),
        readyReset: () => dispatch(readyReset())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo)