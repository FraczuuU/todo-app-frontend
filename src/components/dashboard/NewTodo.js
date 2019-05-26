import React from 'react'
import { Input, Button, DatePicker as DatePickerPC, Icon } from 'antd'
import DatePicker from 'react-mobile-datepicker'
import moment from 'moment'

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
		    isOpen: false
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
            this.props.addTodo(this.state.title, this.state.description, this.state.planDate)
            this.props.getTodos()
            toaster.notify('Successfully added new todo', { duration: 1000 })
            this.props.changeContent('todos')
    }

    handleplanDate(value, planDate) {
        this.setState({
            planDate: planDate
        })
    }

    handleClick = () => {
		this.setState({ isOpen: true });
	}

	handleCancel = () => {
		this.setState({ isOpen: false })
	}

	handleSelect = (time) => {
        this.setState({ planDate: time, isOpen: false })
	}

    changeDatePicker(mql) {
        if(mql) 
            return (
                <Input className="EditTodo-DatePicker" placeholder={ (this.state.planDate) ? moment(this.state.planDate).format('YYYY-MM-DD HH:mm:ss') : 'Select date' } 
                suffix={ <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} /> } onClick={ () => this.handleClick() } />
            )   
        else
            return (
                <DatePickerPC placeholder={  (this.state.planDate) ? moment(this.state.planDate).format('YYYY-MM-DD HH:mm:ss') : 'Select date' } 
                showTime className="EditTodo-DatePicker" onChange={ (value, planDate) => this.handleplanDate(value, planDate) } />
            )
    }

    render() {
        const { TextArea } = Input
        const mql = window.matchMedia('(max-width: 600px)').matches
        const dateConfig = {
            'year': {
                format: 'YYYY',
                caption: 'Year',
                step: 1,
            },
            'month': {
                format: 'MM',
                caption: 'Mon',
                step: 1,
            },
            'date': {
                format: 'DD',
                caption: 'Day',
                step: 1,
            },
            'hour': {
                format: 'hh',
                caption: 'Hour',
                step: 1,
            },
            'minute': {
                format: 'mm',
                caption: 'Min',
                step: 1,
            },
            'second': {
                format: 'ss',
                caption: 'Sec',
                step: 1,
            },
        }
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
                    <DatePicker 
                        value={(this.state.planDate) ? this.state.planDate : new Date()}
                        isOpen={this.state.isOpen}
                        onCancel={this.handleCancel}
                        dateConfig={dateConfig}
                        confirmText="Ok"
                        cancelText="Cancel"
                        onSelect={ (date) => this.handleSelect(date) } />

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
        addTodo: (title, description, planDate) => dispatch(addTodo({ title: title, description: description, planDate: planDate })),
        getTodos: () => dispatch(getTodos()),
        changeContent: (content) => dispatch(changeContent(content))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTodo)