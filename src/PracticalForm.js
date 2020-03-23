import React, { Component } from 'react';

export default class PracticalForm extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			password: '',
			nameError: '',
			passwordError: ''
		};
	}
	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	valid() {   
		if (!this.state.name.includes('@') && this.state.password.length < 8) {
			this.setState({
				nameError: 'please @ is requared',
				passwordError: 'please minimum 5 character is requared'
			});
		}else if(!this.state.name.includes('@')){
            this.setState({
				nameError: 'please @ is requared'
				
			});
        }else if(this.state.password.length < 9){
            this.setState({
				passwordError: 'please minimum 8 character is requared'
			});
        }
	}
	submit = () =>{
		this.valid();
	}
	render() {
		return (
			<div className="App">
				<h1>Form Validation</h1>
				name : <input type="text" name="name" onChange={this.handleChange} />
				<p style={{ color: 'red', fontSize: '12px' }}>{this.state.nameError}</p>
				<br />
				Password : <input type="password" name="password" onChange={this.handleChange} />
				<br />
				<p style={{ color: 'red', fontSize: '12px' }}>
					{this.state.passwordError}
				</p>
				<br />
				<button onClick={this.submit}>Click me</button>
			</div>
		);
	}
}
