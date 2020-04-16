import React, { Component } from 'react';
import {render } from 'react-dom';
import './style.css'

render() {
    return (
        <div>
        <Hello name={this.state.name} />
        <p>
        Start editing to see some magic happen :)
        </p>
        </div>

    );
}