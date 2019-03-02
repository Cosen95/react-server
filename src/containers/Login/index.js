import React from 'react';
import Header from '../../components/Header';
import styles from './index.css';
import withStyle from '../../withStyle';

const Login = () => {
    return (
        <div>
            <div className={styles.desc}>login</div>
        </div>
    )
}

export default withStyle(Login, styles);