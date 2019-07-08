import React, {Component} from 'react';
import {Grid, Button} from '@material-ui/core';

import './Calc.css';

class CalcButtons extends Component{

    //stash information in local state
    state = {
        currentNumber: 0,
        currentExpression: '',
        numbers: [],
        operands: [],
    }

    //fire when a calc button was clicked
    handleClick = (event) => {        
        this.setState({
            ...this.state,
            currentExpression: this.state.currentExpression + event.currentTarget.value,
            currentNumber: this.state.currentNumber + event.currentTarget.value,
        })
    }

    //take in current number, make sure there weren't extra expressions
    //run all multiplication/division from left to right then addition/subtraction
    //calculation stops when there's one number left.
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
                    
        let result = 0;        
        
        for(let i = 0; i < operands.length; i++){
            switch (operands[i]) {
                case '*':
                    console.log('multiply');
                    result = numbers[i] * numbers[i + 1];
                    numbers.splice(i, 2, result);
                    operands.splice(i, 1);                    
                    i--;
                    continue;
                case '/':
                    console.log('divide');
                    result = numbers[i] / numbers[i + 1];
                    numbers.splice(i, 2, result);
                    operands.splice(i, 1);                    
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
                    result = (numbers[i] - numbers[i+1]);                    
                    numbers.splice(i, 2, result);
                    operands.splice(i, 1);
                    i--;
                    continue;
            
                default:
                    break;
            }
        }        

        currentExpression += ` = ${numbers[0]}`;
        this.props.handleSubmit(currentExpression);        
        this.setState({
            currentNumber: 0,
            currentExpression: '',
            numbers: [],
            operands: [],
        })
    }

    //an operation button was pressed...add it to our operands array/trigger expression resolution.
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

        //reset values.
        this.clearExpression();
    }

    //reset all values.
    clearExpression = () => {
        this.setState({
            currentExpression: '',
            currentNumber: 0,
            numbers: [],
            operands: []
        })
    }

    //put the buttons in rows...like a calculator.
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