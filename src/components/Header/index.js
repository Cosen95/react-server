import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Link to = '/'>Home</Link>
            <br />
            <Link to = '/login'>Login</Link>
            <br />
            <Link to = '/translation'>翻译列表</Link>
        </div> 
    )
}

export default Header;