import React, {Component} from 'react';
import {Grid, Button} from '@material-ui/core';
import socketIOClient from 'socket.io-client';
import Axios from 'axios';

import CalcButtons from './CalcButtons.jsx';

import './Calc.css';
import ExpressionDisplay from '../ExpressionDisplay/ExpressionDisplay.jsx';

const URL = `https://alluring-mesa-verde-82256.herokuapp.com`;
// const URL = `ws://localhost:5000`;

const socket = socketIOClient(URL);

class Calc extends Component{

    state = {
        test: '',
        expressions: []
    }    

    componentDidMount() {
        this.GETExpressions();
        socket.on('connection', () => {
            console.log('connected to server');            
        })
        socket.on('sendExpression', (expression) => {
            console.log('got the expression back:', expression)            
            this.GETExpressions();
        })
    }

    GETExpressions = () => {
        console.log('in get expressions');
        Axios.get('/api/expression')
            .then((result) => {
                console.log("result from GET expressions request", result);
                this.addExpression(result.data);
            }).catch((error) => {
                console.log("Error in GET expressions request:", error);
            })
    }

    addExpression = (expressions) => {
        console.log('in expression with:', expressions);
        this.setState({
            expressions: expressions
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
        Axios.post('/api/expression/add', message)
        .then((result) => {
            console.log('result from POST expression request:', result);
            socket.emit('sendExpression', message);
        }).catch((error) => {
            console.log('error in POST expression request:', error);
        })        
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