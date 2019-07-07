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

    resolveExpression = (currentNumber) => {
        let currentExpression = this.state.currentExpression;
        let numbers = this.state.numbers;
        numbers.push(currentNumber);
        let operands = this.state.operands;
        
        if(Number.isNaN(parseFloat(currentExpression[currentExpression.length-1]))){
            currentExpression = currentExpression.substring(0, currentExpression.length - 2);
            numbers.pop();
            operands.pop();
        }                
        console.log("resolving expression:", currentExpression);
        console.log('last inputted value:', this.state.currentExpression[this.state.currentExpression.length - 2])
                    
        let result = 0;        
        console.log('numbers before resolution:', numbers);
        for(let i = 0; i < operands.length; i++){
            switch (operands[i]) {
                case '*':
                    console.log('multiply');
                    result = numbers[i] * numbers[i + 1];
                    numbers.splice(i, 2, result);
                    operands.splice(i, 1);
                    console.log("numbers after multiply", numbers);
                    console.log("operands after multiply:", operands);
                    i--;
                    continue;
                case '/':
                    console.log('divide');
                    result = numbers[i] / numbers[i + 1];
                    numbers.splice(i, 2, result);
                    operands.splice(i, 1);
                    console.log("numbers after divide", numbers);
                    console.log("operands after divide:", operands);
                    i--;
                    continue;
                default:
                    break;
            }
        }
        for(let i = 0; i < operands.length; i++){
            switch (operands[i]) {
                case '+':
                    console.log('add');
                    result = numbers[i] + numbers[i+1];
                    numbers.splice(i, 2, result);
                    operands.splice(i, 1);
                    i--;
                    continue;
                case '-':
                    console.log("subtract");
                    console.log('index:', i);
                    result = (numbers[i] - numbers[i+1]);
                    console.log('numbers[i] in subtract:', numbers[i]);
                    console.log('numbers[i+1] in subtract')
                    console.log('result after subtraction:', result);
                    numbers.splice(i, 2, result);
                    operands.splice(i, 1);
                    i--;
                    continue;
            
                default:
                    break;
            }
        }
        
        console.log('numbers after MD', numbers);

        currentExpression += ` = ${numbers[0]}`;
        this.props.handleSubmit(currentExpression);
        console.log('current resolved expression:', currentExpression);
    }

    handleOperation = (operation) => {
        if(this.state.currentExpression.length <= 0){
            return;
        }

        let currentNumber = parseFloat(this.state.currentNumber);
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
                this.resolveExpression(currentNumber);
                return;                
        
            default:
                break;
        }

        this.setState({
            ...this.state,
            numbers: [...this.state.numbers, currentNumber],
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
            <div className='calc'>
                <Grid container justify="center">
                    <Grid item xs={12}>
                        <Grid item xs={12} sm={12}>
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
            </div>            
        )
    }
}

export default CalcButtons;