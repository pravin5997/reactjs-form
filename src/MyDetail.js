import React, { Component } from 'react';
import LocationSearchInput from './AutoPlace';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker from './DateOfBirth';
import bsCustomFileInput from 'bs-custom-file-input';
// import { Textbox } from 'react-inputs-validation';
// import { Radiobox } from 'react-inputs-validation';
import MdbForm from './MdbForm';
import './formcss.css';
// import $ from 'jquery';

const emailRegex = /^[a-zA-Z0-9.]+@+[a-zA-Z0-9]+.+[A-z]/;
const a = { firstName: 'firstName', lastName: 'lastName', number: 'number' };
export default class MyDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			myPlace:"",
			addressError:'',
			myaddress: '',
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
			State: '',
			ZipCode: '',
			number: '',
			myBirthDate: '',
			textInput: '',
			email: '',
			emailError: '',
			mobile: '',
			mobileError: '',
			firstName: '',
			firstNameError: '',
			lastName: '',
			lastNameError: '',
			someName: '',
			date:"",
			dateError:""
		};
	}
	handleClickForm = (event) => {
		this.valid();
		this.setState({
			myaddress: this.state.address,
			MobileNo: document.getElementById('mobile').value,
			FirstName: document.getElementById('firstName').value,
			LastName: document.getElementById('lastName').value,
			EmailId: document.getElementById('email').value,
			State: document.getElementById('state').value,
			ZipCode: document.getElementById('zipcode').value,
			myBirthDate: document.getElementById('date').value
		});
	};
	handleFileChange = (event) => {
		let image = document.getElementById('output');
		image.src = URL.createObjectURL(event.target.files[0]);
		this.setState({ myImages: event.target.value });
	};

	handleDateChange = (birthDate) => this.setState({ birthDate });
	handleChange = (address) => {
		
		this.setState({ address});
	};

	handleSelect = (address,event) => {
		
		geocodeByAddress(address).then((results) => {
		
			this.setState({ address,
							myData: results[0].formatted_address }, () => {
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
	onChangeErroHandle = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	valid() {
		if (this.state.firstName.length < 1) {
			this.setState({
				firstNameError: 'This field is required'
			});
		} else {
			this.setState({
				firstNameError: null
			});
		}
		if (this.state.lastName.length < 1) {
			this.setState({
				lastNameError: 'This field is required'
			});
		} else {
			this.setState({
				lastNameError: null
			});
		}
		if (this.state.mobile.length === 0) {
			this.setState({
				mobileError: 'This field is required'
			});
		} else {
			this.setState({
				mobileError: 'This field is required'
			});
		}
		if (this.state.email.length === 0) {
			this.setState({
				emailError: 'This fiel is required'
			});
		} else if (!emailRegex.test(this.state.email)) {
			this.setState({
				emailError: 'Invalid Email!'
			});
		} else {
			this.setState({
				emailError: null
			});
		}
		if (this.state.mobile.length < 0) {
			this.setState({
				mobileError: 'This fiel is required'
			});
		} else {
			this.setState({
				mobileError: null
			});
		}
		if (this.state.address.length < 1) {
			this.setState({
				addressError: 'This field is required'
			});
		} else {
			this.setState({
				addressError: null
			});
		}

	}
	myClickHandler = () => {
		this.valid();
	};
	render() {
		console.log(this.state.myPlace)
		return (
			<div className="container register">
				<div className="row">
					<div className="col-md-3 register-left">
						<img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
						<h3>Welcome</h3>
						<h3>Pravin</h3>
					</div>
					<div className="col-md-9 register-right">
						<div className="tab-content" id="myTabContent">
							<div
								className="tab-pane fade show active"
								id="home"
								role="tabpanel"
								aria-labelledby="home-tab"
							>
								<h3 className="register-heading">Registration Form</h3>
								<div className="row register-form" autocomplete="off">
									<div className="col-md-6">
										<div className="form-group">
											<label>
												First Name<span style={{ color: 'red' }}>*</span>
											</label>
											<input
												className="form-control"
												type="text"
												name="firstName"
												id="firstName"
												maxLength={15}
												placeholder="Your First Name *"
												onChange={this.onChangeErroHandle}
												required
											/>
											<p>{this.state.FirstName}</p>
											<p style={{ color: 'red', fontSize: '12px' }}>
												{this.state.firstNameError}
											</p>
										</div>
										<div className="form-group">
											<label>
												Last Name<span style={{ color: 'red' }}>*</span>
											</label>
											<input
												className="form-control"
												type="text"
												name="lastName"
												id="lastName"
												maxLength={15}
												placeholder="Your Last Name *"
												onChange={this.onChangeErroHandle}
												required
											/>
											<p>{this.state.LastName}</p>
											<p style={{ color: 'red', fontSize: '12px' }}>
												{this.state.lastNameError}
											</p>
										</div>
										<div className="form-group">
											<label>
												Mobile No.<span style={{ color: 'red' }}>*</span>
											</label>
											<input
												type="text"
												className="form-control"
												id="mobile"
												onChange={(event) => {
													if (isNaN(Number(event.target.value))) {
														return;
													} else {
														this.setState({ mobile: event.target.value });
													}
												}}
												maxLength={13}
												placeholder="Enter Mobile number*"
												value={this.state.mobile}
											/>
											<p>{this.state.MobileNo}</p>
											<p style={{ color: 'red', fontSize: '12px' }}>
												{this.state.mobileError}
											</p>
										</div>
										<div className="form-group">
											<label>
												Email Id<span style={{ color: 'red' }}>*</span>
											</label>
											<input
												className="form-control"
												type="text"
												name="email"
												id="email"
												placeholder="Your Email *"
												onChange={this.onChangeErroHandle}
												required
											/>
											<p>{this.state.EmailId}</p>
											<p style={{ color: 'red', fontSize: '12px' }}>
												{this.state.emailError}
											</p>
										</div>
									</div>

									<div className="col-md-6">
										<label>
											City<span style={{ color: 'red' }}>*</span>
										</label>
										<div className="form-group">
											<LocationSearchInput
												handleplace={this.handleChange}
												selectHandle={this.handleSelect}
												myValue={this.state.address}
												required
												style={{ height: '500px' }}
											/>
											<p>{this.state.myaddress}</p>
											<p style={{ color: 'red', fontSize: '12px' }}>
												{this.state.addressError}
											</p>
										</div>
										<div className="form-group">
											<label>
												State
											</label>
											<input
												className="form-control"
												type="text"
												id="state"
												value={this.state.myState[1]}
												placeholder="Enter State*"
												readOnly
											/>
											<p>{this.state.State}</p>
										</div>
										{this.state.myCity.length === 3 ? (
											<div className="form-group">
												<label>Zip Code</label>
												<input
													value={this.state.myState[2]}
													placeholder="Zip Code*"
													id="zipcode"
													type="text"
													className="form-control"
													readOnly
												/>
												<p>{this.state.ZipCode}</p>
											</div>
										) : (
											<div className="form-group">
												<label>Zip Code</label>
												<input
													value=""
													className="form-control"
													placeholder="-"
													type="text"
													id="zipcode"
													readOnly
												/>
												<p>{this.state.ZipCode}</p>
											</div>
										)}
										<div className="form-group"></div>
										<div className="form-group">
											<label>
												Date Of Birth<span style={{ color: 'red' }}>*</span>
											</label>
											<DatePicker
												onChangeEvent={this.handleDateChange}
												DateValue={this.state.birthDate}
											/>
											<p>{this.state.myBirthDate}</p>
										</div>
									</div>

									<div className="col-md-12">
										<div className="form-group">
											<label>upload image<span style={{ color: 'red' }}>*</span></label>
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
													<label
														className="custom-file-label"
														htmlFor="inputGroupFile01"
													>
														Choose file*
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
										</div>
									</div>
									<div className="col-md-2">
										<div className="form-group">
											<lable>
												Gender
											</lable>
										</div>
									</div>
									<div className="col-md-10">
										<div className="form-group">
											<div className="maxl">
												<label className="radio inline">
													<input
														type="radio"
														name="gender"
														value="male"
														checked
														
													/>
													<span style={{marginRight:"15px"}}> Male </span>
												</label>
												<label className="radio inline">
													<input type="radio" name="gender" value="female" />
													<span>Female </span>
												</label>
											</div>
										</div>
									</div>
									<div className="col-md-2">
										<div className="form-group">
											<label className="lable">Hobby</label>
										</div>
									</div>
									<div className="col-md-10">
										<div className="form-group">
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
										</div>
									</div>
									<Button
										type="button"
										className="btnRegister"
										onClick={this.handleClickForm}
									>
										Register
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
