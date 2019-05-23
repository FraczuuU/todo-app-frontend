import React from 'react'

import './Settings.css'

import SettingsUsernameForm from './forms/SettingsUsernameForm'
import SettingsEmailForm from './forms/SettingsEmailForm'
import SettingsPasswordForm from './forms/SettingsPasswordForm'

class Settings extends React.Component {
    render() {
        return (
            <div className="Settings">
                <header className="Settings-Header">Settings</header>
                <div className="Settings-Wrapper">
                    <div className="Settings-Container">
                        <SettingsUsernameForm />
                        <SettingsEmailForm />
                        <SettingsPasswordForm />
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings