import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import MyForm from './MyForm'

export default class App extends Component {
	
	render() {
		return (
			<div className="container" style={{marginTop:"30px"}}>
        <MyForm />
			</div>
		);
	}
}
