import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.css';
import withStyle from '../../withStyle';

class Header extends Component {
    
    render() {
        return (
            <div className={styles.container}>
                <Link to = '/' className={styles.item}>首页</Link>
                <Link to = '/login'className={styles.item}>登陆</Link>
                <Link to = '/translation' className={styles.item}>翻译列表</Link>
            </div> 
        )
    }
}

export default withStyle(Header, styles);