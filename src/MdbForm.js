import React, { Component } from 'react';
import { Textbox } from 'react-inputs-validation';

export default class MdbForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mydata: this.props.myDataInput,
            myInputType: this.props.mytype,
			textLenth:this.props.inputLenth,
			MyOnChangeHandler:this.props.changeEventHandle
		};
	}
	render() {
		return (
			<div>
				<Textbox
					attributesInput={{
						id: this.state.mydata,
						name: this.state.mydata,
                        type: 'text',
                        maxLength:this.state.textLenth,
						className: 'form-control',
						placeholder: 'Place your ' + this.state.mydata + ' here'
					}}
					onChange={this.state.MyOnChangeHandler}
					onBlur={() => {}}
					validationOption={{
						type: this.state.myInputType,
						check: true,
						required: true
					}}
				/>
			</div>
		);
	}
}
