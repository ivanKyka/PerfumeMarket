import React from 'react';
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import Notification from './Notification';

export default class AlertTest extends React.Component {

    render() {
        return (
            <div>
                <button onClick={() => {
                    store.addNotification(Notification('hello'));
                }}>
                    show alert
                </button>
                <ReactNotification/>
            </div>
        )
    }
}