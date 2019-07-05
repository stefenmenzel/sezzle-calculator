import React, {Component} from 'react';
import {Grid, Button} from '@material-ui/core';
import socketIOClient from 'socket.io-client';
import Axios from 'axios';

import CalcButtons from './CalcButtons.jsx';

import './Calc.css';
import ExpressionDisplay from '../ExpressionDisplay/ExpressionDisplay.jsx';

const URL = `https://alluring-mesa-verde-82256.herokuapp.com`;

const socket = socketIOClient(URL);

class Calc extends Component{

    state = {
        test: '',
        expressions: []
    }    

    componentDidMount() {
        socket.on('connection', () => {
            console.log('connected to server');
        })
        socket.on('sendExpression', (expression) => {
            console.log('got the expression back:', expression)
            this.addExpression(expression);
        })
    }

    addExpression = (expression) => {
        console.log('in expression with:', expression);
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