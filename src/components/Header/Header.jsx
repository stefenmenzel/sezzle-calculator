import React, {Component} from 'react';

import './Header.css';


class Header extends Component{

    render(){
        return(
            <div className="header">
                <h1 className="headerText">Web Socket Calculator</h1>
            </div>            
        )
    }
}

export default Header;