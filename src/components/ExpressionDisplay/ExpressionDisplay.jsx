import React, {Component} from 'react'
import Expression from '../Expression/Expression.jsx';

class ExpressionDisplay extends Component{
    state = {
        expressions: []
    }
    
    render(){
        return(
            <div>
                <h2>Expressions</h2>
                {this.props.expressions.map((expression, index) => {
                    return (<li key={index}>{expression.expression}</li>)
                })}
            </div>
        )
    }

}

export default ExpressionDisplay;