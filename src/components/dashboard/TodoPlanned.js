import React from 'react'
import { List, Card, Icon } from 'antd'

import './TodoPlanned.css'

class TodoPlanned extends React.Component {
    render() {
        const data = [
            {
                title: 'Todo Planned 1',
            },
            {
                title: 'Todo Planned 2',
            },
            {
                title: 'Todo Planned 3',
            },
            {
                title: 'Todo Planned 4',
            },
          ]

        return (
            <div className="TodoPlanned">
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
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <Card title={item.title} extra={ <Icon type="edit" className="editTodo" /> }>Description</Card>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default TodoPlanned