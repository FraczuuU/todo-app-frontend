import React from 'react'
import { Input, Button, DatePicker as DatePickerPC, Icon } from 'antd'
import DatePicker from 'react-mobile-datepicker'
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
            planDate: this.props.todoPlanDate,
            isOpen: false
        }

    }

    componentDidMount() {
        this.props.readyReset()
    }

    modifyDate(date) {
        let Year = moment(this.state.planDate).format('YYYY')
        let Month = moment(this.state.planDate).format('MM')
        let Day = moment(this.state.planDate).format('DD')
        let Hour = moment(this.state.planDate).format('HH')
        let Minute = moment(this.state.planDate).format('mm')
        let Second = moment(this.state.planDate).format('ss')
        return new Date(Year, Month-1, Day, Hour, Minute, Second)
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

                    { this.changeDatePicker(mql) }
                    <DatePicker 
                        value={(this.state.planDate) ? this.modifyDate(this.state.planDate) : new Date()}
                        isOpen={this.state.isOpen}
                        onCancel={this.handleCancel}
                        dateConfig={dateConfig}
                        confirmText="Ok"
                        cancelText="Cancel"
                        onSelect={ (date) => this.handleSelect(date) } />

                    
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