import React, { Component } from 'react';
import Header from './Header';
import ProfileList from './ProfileList';
import './App.css';

export default class App extends Component {
    render() {
        console.log('I am from simple-connections-2 repo')
        return (
            <div>
                <Header/>
                <ProfileList/>
            </div>
        )
    }
}
