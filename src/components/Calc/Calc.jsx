import React, {Component} from 'react';
import {Grid} from '@material-ui/core';

import CalcButtons from './CalcButtons.jsx';

import './Calc.css';

class Calc extends Component{

    state = {
        
    }

    render(){
        return(
            <div className="calcDiv">
                <Grid container justify="center">
                    <Grid item xs={12}>

                        <Grid item xs={10}>
                            {/* in progress expression here */}
                        </Grid>
                        <Grid item xs={2}>
                            {/* put the C here */}
                        </Grid>

                        <CalcButtons />
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default Calc;