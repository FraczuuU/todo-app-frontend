import React from 'react'
import { Button, Input } from 'antd';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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
            description: '',
            planDate: '',
            image: null
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
            const todo = { 
                title: this.state.title,
                description: this.state.description,
                planDate: this.state.planDate,
                image: this.state.image
            }

            this.props.addTodo(todo)
            this.props.getTodos()
            toaster.notify('Successfully added new todo', { duration: 1000 })
            this.props.changeContent('todos')
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
            <div className="NewTodo">
                <header className="NewTodo-Header">New Todo</header>
                <div className="NewTodo-Wrapper">
                    <div className="NewTodo-Container">
                    <TextArea onChange={ (e) => this.handleTitle(e) } placeholder="Title" autosize />
                        <div style={{ margin: '24px 0' }} />
                    <TextArea
                        onChange={ (e) => this.handleDescription(e) }
                        placeholder="Description"
                        autosize={{ minRows: 4}}
                    />
                
                    { this.changeDatePicker(mql) }

                    <Input className="NewTodo-FileInput"  type="file" onChange={ (e) => this.handleImage(e) } />

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
        addTodo: (todo) => dispatch(addTodo(todo)),
        getTodos: () => dispatch(getTodos()),
        changeContent: (content) => dispatch(changeContent(content))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTodo)