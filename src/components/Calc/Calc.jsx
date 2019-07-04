import React, {Component} from 'react';
import {Grid, Button} from '@material-ui/core';
import socketIOClient from 'socket.io-client';
import Axios from 'axios';

import CalcButtons from './CalcButtons.jsx';

import './Calc.css';
import ExpressionDisplay from '../ExpressionDisplay/ExpressionDisplay.jsx';

// const URL = `wss://localhost:${process.env.port || 5000}`
// const URL = `ws:https://immense-dawn-65811.herokuapp.com:${process.env.port || 5000}`
// const URL = (process.env.PORT) ? 
//     `https://immense-dawn-65811.herokuapp.com/` :
//     `ws://192.168.1.135:5000`;
const URL = `wss://immense-dawn-65811.herokuapp.com/`;
const HOST = window.location;
console.log('host:', HOST);
console.log("host:", `ws://${HOST.hostname}:${process.env.PORT || 5000}`);
console.log('process.env.PORT is real:', (process.env.PORT) ? true : false);

// let URL = window.location.origin.replace(/^https/, 'ws');
// if(process.env.port){
//     URL = window.location.origin.replace(/^http/, 'ws');
// }else{
//     URL = `ws://localhost:5000`; 
// }

const socket = socketIOClient(URL, {
    secure: true,
    transports: ['websocket'],
    upgrade: false,
});
// const socket = socketIOClient.connect(URL);

class Calc extends Component{

    state = {
        test: '',
        expressions: []
    }    
        
    // socket = socketIOClient(URL);  
    // socket = io();
    // socket = socketIOClient.connect(URL, {
    //     transports: ['websocket'],
    //     upgrade: false,
    // })
    // socket = socketIOClient(URL, {secure: true});    
    // socket = socketIOClient(URL, {
    //     transports: ['websocket'],
    //     jsonp: false
    // });    

    componentDidMount() {
        socket.connect();
        socket.on('connection', () => {
            console.log('connected to server');
        })
        socket.on('sendExpression', (expression) => {
            console.log('got the expression back:', expression)
            this.addExpression(expression);
        })
    }

    addExpression = (expression) => {
        this.setState({
            expressions: [expression, ...this.state.expressions]
        })
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            test: event.target.value
        })
    }

    handleSubmit = (expression) => {
        // event.preventDefault();
        const message = {expression: expression};
        socket.emit('sendExpression', message);
    }

    render(){
        console.log("calc state", this.state);        
        return(
            <div className="calcDiv">
                <Grid container justify="center">
                    <Grid item xs={8}>
                        <CalcButtons handleSubmit={this.handleSubmit}/>
                        <ExpressionDisplay expressions={this.state.expressions}/>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default Calc;