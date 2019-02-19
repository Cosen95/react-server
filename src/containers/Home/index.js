import React from 'react';
import Header from '../../components/Header';
const Home = () => {
    return (
        <div>
            <Header />
            <div>ssr</div>
            <button onClick={() => {alert('click1')}}>点击我</button>
        </div>
    )
}

export default Home;