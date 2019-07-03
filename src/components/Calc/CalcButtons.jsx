import React, {Component} from 'react';
import {Grid, Button} from '@material-ui/core';

import './Calc.css';

class CalcButtons extends Component{

    handleClick = (event) => {
        console.log('button value:', event.currentTarget.value);
    }

    handleOperation = (operation) => {
        switch (operation) {
            case 'add':
                console.log('adding');
                break;
            case 'subtract':
                console.log('subtracting');
                break;
            case 'divide':
                console.log('dividing');
                break;
            case 'multiply':
                console.log('multiply');
                break;
            case 'resolve':
                console.log('resolving');
                break;
        
            default:
                break;
        }
    }

    render(){
        return(
            <Grid container justify="center">
                <Grid item xs={8}>
                    <Grid item xs={12}>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value="7">7</Button>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value="8">8</Button>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value="9">9</Button>
                        <Button className="calcButton" variant='contained' onClick={(e) => this.handleOperation('divide')} value="÷">÷</Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value="4">4</Button>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value="5">5</Button>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value="6">6</Button>
                        <Button className="calcButton" variant='contained' onClick={(e) => this.handleOperation('multiply')} value="×">×</Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value="1">1</Button>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value="2">2</Button>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value="3">3</Button>
                        <Button className="calcButton" variant='contained' onClick={(e) => this.handleOperation('subtract')} value="-">-</Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value="0">0</Button>
                        <Button className="calcButton" variant='contained' onClick={this.handleClick} value=".">.</Button>
                        <Button className="calcButton" variant='contained' onClick={(e) => this.handleOperation('resolve')} value="=">=</Button>
                        <Button className="calcButton" variant='contained' onClick={(e) => this.handleOperation('add')} value="+">+</Button>
                    </Grid>
                </Grid>
            </Grid>            
        )
    }
}

export default CalcButtons;