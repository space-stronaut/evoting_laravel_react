import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes/index'
import {BrowserRouter} from 'react-router-dom'

function Render() {
    return (
        <Router />
    );
}

export default Render;

if (document.getElementById('example')) {
    ReactDOM.render(
        <BrowserRouter>
            <Render />
        </BrowserRouter>
        , 
    document.getElementById('example'));
}
