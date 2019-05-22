import React from 'react'
import { List, Card } from 'antd'

import './Settings.css'

class Settings extends React.Component {
    render() {
        const data = [
            {
                title: 'Setting 1',
            },
            {
                title: 'Setting 2',
            }
          ]

        return (
            <div className="Settings">
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
                            <Card title={item.title}>Description</Card>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default Settings