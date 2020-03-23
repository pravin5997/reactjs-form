import React, { Component } from 'react';
import LocationSearchInput from './AutoPlace';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker from './DateOfBirth';
import bsCustomFileInput from 'bs-custom-file-input';
import { Textbox } from 'react-inputs-validation';
import { Radiobox } from 'react-inputs-validation';
import MdbForm from './MdbForm';

export default class MyForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			myData: [],
			myCity: [],
			myState: [],
			birthDate: new Date(),
			myImages: '',
			mySrcImage: '',
			FirstName: '',
			LastName: '',
			MobileNo: '',
			EmailId: '',
			number: '',
			textInput: '',
			job: ''
		};
	}
	handleClickForm = (event) => {
		this.setState({
			FirstName: this.state.textInput,
			// LastName: l_name,
			MobileNo: this.state.number
			// EmailId: Email_id
		});
	};
	handleFileChange = (event) => {
		let image = document.getElementById('output');
		image.src = URL.createObjectURL(event.target.files[0]);
		this.setState({ myImages: event.target.value });
	};

	handleDateChange = (birthDate) => this.setState({ birthDate });
	handleChange = (address) => {
		this.setState({ address });
	};

	handleSelect = (address) => {
		geocodeByAddress(address).then((results) => {
			this.setState({ myData: results[0].formatted_address }, () => {
				this.setState({
					myCity: this.state.myData.split(','),
					myState: this.state.myData.split(',')[1].split(' ')
				});
			});
			getLatLng(results[0]);
		});
	};
	myFileHandleChange = (event) => {
		bsCustomFileInput.init();
		let myImageSrc = URL.createObjectURL(event.target.files[0]);
		this.setState({ mySrcImage: myImageSrc });
	};
	onChangeRadio = (job, e) => {
		this.setState({ job });
	};
	render() {
		return (
			<div>
				<Form className="form">
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>First Name</Form.Label>
							<MdbForm myDataInput="firstName" mytype="text" inputLenth={15}/>
							<p>{this.state.FirstName}</p>
						</Form.Group>

						<Form.Group as={Col}>
							<Form.Label>Last Name</Form.Label>
							<MdbForm myDataInput="lastName" mytype="text" inputLenth={15}/>
							<p>{this.state.LastName}</p>
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								id="emailId"
								placeholder="Enter email"
								required
							/>
							<p>{this.state.EmailId}</p>
						</Form.Group>

						<Form.Group as={Col}>
							<Form.Label>Mobile No.</Form.Label>
							<MdbForm myDataInput="number" mytype="number" inputLenth={13}/>
							<p>{this.state.MobileNo}</p>
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col} md={6}>
							<Form.Label>Date Of Birth</Form.Label>

							<DatePicker
								onChangeEvent={this.handleDateChange}
								DateValue={this.state.birthDate}
							/>
						</Form.Group>
					</Form.Row>

					<Form.Group as={Row}>
						<Form.Group as={Col} md={2}>
							<Form.Label as="legend">Gender</Form.Label>
						</Form.Group>
						<Form.Group as={Col} md={4}>
							<Radiobox
								attributesInput={{
									id: 'gender',
									name: 'gender'
								}}
								value={this.state.job}
								optionList={[
									{ id: 'male', name: 'Male' },
									{ id: 'female', name: 'Female' }
								]}
								customStyleContainer={{
									display: 'flex',
									justifyContent: 'flex-start'
								}}
								customStyleOptionListItem={{ marginRight: '20px' }}
								onChange={this.onChangeRadio}
								onBlur={(e) => {}}
								validationOption={{
									name: 'job',
									check: true,
									required: true
								}}
							/>
						</Form.Group>
					</Form.Group>

					<Form.Group as={Row}>
						<Form.Label as="legend" column md={2}>
							Hobby
						</Form.Label>
						<Form.Check
							custom
							inline
							label="Listening Music"
							type="checkbox"
							id="checkbox1"
						/>
						<Form.Check
							custom
							inline
							label="Playing Cricket"
							type="checkbox"
							id="checkbox2"
						/>
						<Form.Check
							custom
							inline
							label="Watching Movies"
							type="checkbox"
							id="checkbox3"
						/>
						<Form.Check
							custom
							inline
							label="Reading Books"
							type="checkbox"
							id="checkbox4"
						/>
						<Form.Check
							custom
							inline
							label="Cooking"
							type="checkbox"
							id="checkbox5"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Upload</Form.Label>

						<div style={{ display: 'flex', alignItems: 'center' }}>
							<div className="custom-file">
								<input
									id="inputGroupFile01"
									accept=".png, .jpg, .jpeg"
									multiple
									type="file"
									onChange={this.myFileHandleChange}
									className="custom-file-input"
								/>
								<label className="custom-file-label" htmlFor="inputGroupFile01">
									Choose file
								</label>
							</div>
							{this.state.mySrcImage !== '' ? (
								<div style={{ height: '100px', width: '100px' }}>
									<img
										id="output"
										src={this.state.mySrcImage}
										alt="..."
										style={{ width: '100%', height: '100%' }}
									/>
								</div>
							) : (
								''
							)}
						</div>
					</Form.Group>

					<Form.Row>
						<Form.Group as={Col} controlId="formGridCity">
							<Form.Label>City</Form.Label>
							<LocationSearchInput
								handleplace={this.handleChange}
								selectHandle={this.handleSelect}
								myValue={this.state.address}
								required
							/>
						</Form.Group>

						<Form.Group as={Col} controlId="formGridState">
							<Form.Label>State</Form.Label>
							<Form.Control
								type="text"
								value={this.state.myState[1]}
								placeholder="Enter State"
								readOnly
							></Form.Control>
						</Form.Group>
						{this.state.myCity.length === 3 ? (
							<Form.Group as={Col} controlId="formGridZip">
								<Form.Label>Zip</Form.Label>
								<Form.Control
									value={this.state.myState[2]}
									placeholder="Zip Code"
									type="text"
									readOnly
								/>
							</Form.Group>
						) : (
							<Form.Group as={Col} controlId="formGridZip">
								<Form.Label>Zip</Form.Label>
								<Form.Control value="" placeholder="-" type="text" readOnly />
							</Form.Group>
						)}
					</Form.Row>
					<Button
						variant="primary"
						type="button"
						onClick={this.handleClickForm}
					>
						Submit
					</Button>
				</Form>
			</div>
		);
	}
}
