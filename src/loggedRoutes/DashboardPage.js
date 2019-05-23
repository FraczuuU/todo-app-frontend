import React from 'react'
import { Layout, Menu, Icon } from 'antd'

import toaster from 'toasted-notes'
import 'toasted-notes/src/styles.css'

import { resetMessage } from '../redux/actions/messages'
import { logout, resetLogged } from '../redux/actions/login'
import { changeContent } from '../redux/actions/dashboard'
import { connect } from 'react-redux'
 
import './DashboardPage.css'

import NewTodo from '../components/dashboard/NewTodo'
import TodoList from '../components/dashboard/TodoList'
import Settings from '../components/dashboard/Settings'
import EditTodo from '../components/dashboard/EditTodo'

class DashboardPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            collapsed: true
        }

    }
    
    componentDidUpdate() { 
        if(this.props.message) {
            toaster.notify(this.props.message, { duration: 1000 })
            this.props.resetMessage()
        }
        if(this.props.loggedOut) {
            this.props.history.push('/')
            toaster.notify('Successfully logged out!', { duration: 1000 })
            this.props.resetLogged()
        }
    }

    onCollapse = collapsed => {
        this.setState({ collapsed })
    }
    
    render() {
        const { Header, Content, Footer, Sider } = Layout
        const mql = window.matchMedia('(max-width: 600px)').matches
        return (
          <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible={!mql} collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
              <div className="logo"></div>
              <Menu theme="dark" selectedKeys={[this.props.content]} mode="inline">
                <Menu.Item key="newTodo" onClick={ () => this.props.changeContent('newTodo') }>
                  <Icon type="file-add" />
                  <span>New Todo</span>
                </Menu.Item>
                <Menu.Item key="todos" onClick={ () => this.props.changeContent('todos') }>
                  <Icon type="bars" />
                  <span>All Todos</span>
                </Menu.Item>
                <Menu.Item key="settings" onClick={ () => this.props.changeContent('settings') }>
                  <Icon type="setting" />
                  <span>Settings</span>
                </Menu.Item>
                <Menu.Item key="logout" onClick={ () => this.props.logout() }>
                  <Icon type="logout" />
                  <span>Logout</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header className="DashboardPage-Header">
                Dashboard
              </Header>
              <Content style={{ margin: '0 16px' }}>
                { (this.props.content === "newTodo") ? <NewTodo /> : '' }
                { (this.props.content === "todos") ? <TodoList /> : '' }
                { (this.props.content === "settings") ? <Settings /> : '' }
                { (this.props.content === "edit") ? <EditTodo /> : '' }
              </Content>
              <Footer style={{ textAlign: 'center' }}>Todo App - by FraczuuU</Footer>
            </Layout>
          </Layout>
        )
      }
}

const mapStateToProps = (state) => {
    return({
        loggedOut: state.loginReducer.loggedOut,
        message: state.messagesReducer.message,
        content: state.dashboardReducer.content,
        todoID: state.dashboardReducer.todoID
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        logout: () => dispatch(logout()),
        resetMessage: () => dispatch(resetMessage()),
        resetLogged: () => dispatch(resetLogged()),
        changeContent: (content) => dispatch(changeContent(content))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)