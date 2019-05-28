import React from 'react'
import { Input, Button } from 'antd'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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
            id: this.props.todo.id,
            title: this.props.todo.title,
            description: this.props.todo.description,
            planDate: this.props.todo.planDate,
            image: null
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
        const todo = { 
            id: this.state.id,
            title: this.state.title,
            description: this.state.description,
            planDate: this.state.planDate,
            image: this.state.image
        }

        this.props.editTodo(todo)
        toaster.notify('Successfully modified new todo', { duration: 1000 })
        this.props.changeContent(this.props.previous)
}

    handleplanDate(value) {
        this.setState({
            planDate: value
        })
    }

    handleImage(e) {
        let image = e.target.files[0]
        this.setState({
            image: image
        })
    }

    goBack() {
        this.props.changeContent(this.props.previous)
    }

    changeDatePicker(mql) {
        if(mql) 
            return (
                <DatePicker
                    className="NewTodo-DatePicker"
                    selected={ (this.state.planDate) ? new Date(this.state.planDate) : new Date() }
                    value={ (this.state.planDate) ? new Date(this.state.planDate) : 'Select date' }
                    onChange={ (e) => this.handleplanDate(e) }
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="dd-MM-YYYY HH:mm:ss"
                    timeCaption="time"
                    withPortal
                />
            )   
        else
            return (
                <DatePicker
                    className="NewTodo-DatePicker"
                    selected={ (this.state.planDate) ? new Date(this.state.planDate) : new Date() }
                    value={ (this.state.planDate) ? new Date(this.state.planDate) : 'Select date' }
                    onChange={ (e) => this.handleplanDate(e) }
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="dd-MM-YYYY HH:mm:ss"
                    timeCaption="time"
                />
            )
    }

    render() {
        const { TextArea } = Input
        const mql = window.matchMedia('(max-width: 600px)').matches
        return (
            <div className="EditTodo">
                <header className="EditTodo-Header">Edit Todo</header>
                <div className="EditTodo-Wrapper">
                    <div className="EditTodo-Container">
                    <TextArea onChange={ (e) => this.handleTitle(e) } defaultValue={ this.props.todo.title } autosize />
                        <div style={{ margin: '24px 0' }} />
                    <TextArea
                        onChange={ (e) => this.handleDescription(e) }
                        defaultValue={ this.props.todo.description }
                        autosize={{ minRows: 4}}
                    />

                    { this.changeDatePicker(mql) }

                    <Input className="EditTodo-FileInput"  type="file" onChange={ (e) => this.handleImage(e) } />
                    
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
        todo: state.todoReducer.todo,
        previous: state.dashboardReducer.previous
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        changeContent: (content) => dispatch(changeContent(content)),
        editTodo: (todo) => dispatch(editTodo(todo)),
        readyReset: () => dispatch(readyReset())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo)