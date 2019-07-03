import React, {Component} from 'react';
import {Grid, Button} from '@material-ui/core';
import socketIOClient from 'socket.io-client';
import Axios from 'axios';

import CalcButtons from './CalcButtons.jsx';

import './Calc.css';
import ExpressionDisplay from '../ExpressionDisplay/ExpressionDisplay.jsx';

const URL = `ws://localhost:${process.env.port || 5000}`

class Calc extends Component{

    state = {
        test: '',
        expressions: []
    }    
        
    socket = socketIOClient(URL);  

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

    handleSubmit = (event) => {
        event.preventDefault();
        const message = this.state.test;        
        this.socket.emit('sendExpression', message);
    }

    render(){
        this.socket.on('sendExpression', (expression) => {
            this.addExpression(expression);
        })
        return(
            <div className="calcDiv">
                <Grid container justify="center">
                    <Grid item xs={8}>
                        <CalcButtons handleChange={this.handleChange}/>
                        <ExpressionDisplay expressions={this.state.expressions}/>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default Calc;