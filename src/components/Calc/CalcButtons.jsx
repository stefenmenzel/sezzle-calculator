import React, {Component} from 'react';
import {Grid, Button} from '@material-ui/core';

import './Calc.css';

class CalcButtons extends Component{

    state = {
        currentNumber: 0,
        currentExpression: '',
        numbers: [],
        operands: [],
    }

    handleClick = (event) => {
        console.log('button value:', event.currentTarget.value);
        this.setState({
            ...this.state,
            currentExpression: this.state.currentExpression + event.currentTarget.value,
            currentNumber: this.state.currentNumber + event.currentTarget.value,
        })
    }

    resolveExpression = () => {
        console.log("resolving expression:", this.state.currentExpression);
    }

    handleOperation = (operation) => {
        let currentNumber = this.state.currentNumber;
        let operand = '';

        switch (operation) {
            case 'add':
                console.log('adding');
                operand = '+';
                break;
            case 'subtract':
                console.log('subtracting');
                operand = '-';
                break;
            case 'divide':
                console.log('dividing');
                operand = '/';
                break;
            case 'multiply':
                console.log('multiply');
                operand = '*';
                break;
            case 'resolve':
                console.log('resolving');
                this.resolveExpression();
                break;
        
            default:
                break;
        }

        this.setState({
            ...this.state,
            numbers: [...this.state.numbers, Number(this.state.currentNumber)],
            operands: [...this.state.operands, operand],
            currentNumber: '0',
            currentExpression: this.state.currentExpression + ' ' + operand + ' ',
        });
    }

    clearExpression = () => {
        this.setState({
            currentExpression: '',
            currentNumber: 0,
            numbers: [],
            operands: []
        })
    }

    render(){
        console.log("calc button state:", this.state);
        return(
            <Grid container justify="center">
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <input disabled value={this.state.currentExpression} className="inputField" onChange={this.props.handleChange} />
                        <Button className="cButton" variant="contained" color="primary" onClick={this.clearExpression}>C</Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value="7">7</Button>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value="8">8</Button>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value="9">9</Button>
                        <Button className="calcButton" variant='contained' color="primary" onClick={(e) => this.handleOperation('divide')} value="÷">÷</Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value="4">4</Button>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value="5">5</Button>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value="6">6</Button>
                        <Button className="calcButton" variant='contained' color="primary" onClick={(e) => this.handleOperation('multiply')} value="×">×</Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value="1">1</Button>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value="2">2</Button>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value="3">3</Button>
                        <Button className="calcButton" variant='contained' color="primary" onClick={(e) => this.handleOperation('subtract')} value="-">-</Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value="0">0</Button>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value=".">.</Button>
                        <Button className="calcButton" variant='contained' color="primary" onClick={(e) => this.handleOperation('resolve')} value="=">=</Button>
                        <Button className="calcButton" variant='contained' color="primary" onClick={(e) => this.handleOperation('add')} value="+">+</Button>
                    </Grid>
                </Grid>
            </Grid>            
        )
    }
}

export default CalcButtons;