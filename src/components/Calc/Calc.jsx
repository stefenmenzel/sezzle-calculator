import React, {Component} from 'react';
import {Grid} from '@material-ui/core';
import socketIOClient from 'socket.io-client';
import Axios from 'axios';

import CalcButtons from './CalcButtons.jsx';

import './Calc.css';
import ExpressionDisplay from '../ExpressionDisplay/ExpressionDisplay.jsx';

const URL = `ws://localhost:${process.env.port || 5000}`
// const ws = new WebSocket(URL)

class Calc extends Component{

    state = {
        test: '',
        expressions: []
    }    
    
    // ws = new WebSocket(URL);  
    socket = socketIOClient(URL);  

    componentDidMount() {

        this.socket.on('sendExpression', (expression) => {
            console.log('got the expression back:', expression)
            this.addExpression(expression);
        })

        // this.socket.on('()' => {
        //     console.log('connected');
        //     this.socket.emit('testing connection');
        // }

        // console.log('mount');
        // this.ws.onopen = () => {
        //     //on connecting, log
        //     console.log('connected');
        //     this.ws.send('hello');
        // }

        // this.ws.onmessage = (event) => {
        //     //on receiving an expression, add it to  state
        //     console.log('event.data', event.data);
        //     const expression = JSON.parse(event.data);
        //     this.addExpression(expression);
        // }

        // this.ws.onclose = () => {
        //     console.log('disconnected');
        //     //attempt to reconnect on loss of connection
        //     this.setState({
        //         ws: new WebSocket(URL),
        //     })
        // }
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
        // Axios.post('/echo', message);        
        // this.ws.send(JSON.stringify(message));
        // this.addExpression(message);
        this.socket.emit('sendExpression', message);
    }

    render(){
        this.socket.on('sendExpression', (expression) => {
            this.addExpression(expression);
        })
        return(
            <div className="calcDiv">
                <Grid container justify="center">
                    <Grid item xs={12}>

                        <Grid item xs={10}>
                            {/* in progress expression here */}
                            <input onChange={this.handleChange} />
                            <button onClick={this.handleSubmit}>send test</button>
                        </Grid>
                        <Grid item xs={2}>
                            {/* put the C here */}
                        </Grid>

                        <CalcButtons />
                        <ExpressionDisplay expressions={this.state.expressions}/>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default Calc;