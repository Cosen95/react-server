import React from 'react';
import Header from './components/Header';
import { renderRoutes } from 'react-router-config';

const App = (props) => {
    return (
        <div>
            <Header />
            {renderRoutes(props.route.routes)}
        </div>
    )
}

App.loadData = (store) => {
    
}

export default App;