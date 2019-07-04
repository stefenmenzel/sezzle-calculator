import React, {Component} from 'react';
import {Grid, Button} from '@material-ui/core';
import socketIOClient from 'socket.io-client';
import Axios from 'axios';

import CalcButtons from './CalcButtons.jsx';

import './Calc.css';
import ExpressionDisplay from '../ExpressionDisplay/ExpressionDisplay.jsx';

// const URL = `ws://localhost:${process.env.port || 5000}`
// const URL = `ws:https://immense-dawn-65811.herokuapp.com:${process.env.port || 5000}`
const URL = (process.env.port) ? 
    `https://immense-dawn-65811.herokuapp.com/socket.io/?EIO=4&transport=websocket` :
    `ws://192.168.1.135:5000`;
// const URL = '';
// if(process.env.port){
//     URL = location.origin.replace(/^http/, 'ws');
// }else{
//     URL = `ws://localhost:5000`; 
// }

class Calc extends Component{

    state = {
        test: '',
        expressions: []
    }    
        
    socket = socketIOClient(URL);  
    // socket = io();

    componentDidMount() {
        this.socket.on('sendExpression', (expression) => {
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
        this.socket.emit('sendExpression', message);
    }

    render(){
        console.log("calc state", this.state);
        // this.socket.on('sendExpression', (expression) => {
        //     this.addExpression(expression);
        // })
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