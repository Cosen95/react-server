import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.css';

class Header extends Component {
    componentWillMount() {
        if(this.props.staticContext) {
            this.props.staticContext.css.push(styles._getCss());
        }
    }
    render() {
        return (
            <div className={styles.content}>
                <Link to = '/'>Home</Link>
                <br />
                <Link to = '/login'>Login</Link>
                <br />
                <Link to = '/translation'>翻译列表</Link>
            </div> 
        )
    }
}

export default Header;