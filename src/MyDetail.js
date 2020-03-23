import React, { Component } from 'react';
import LocationSearchInput from './AutoPlace';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker from './DateOfBirth';
import bsCustomFileInput from 'bs-custom-file-input';
import { Textbox } from 'react-inputs-validation';
import { Radiobox } from 'react-inputs-validation';
import MdbForm from './MdbForm';
import './formcss.css';

const a = {firstName:"firstName",lastName:"lastName",number:"number"}
export default class MyDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			myaddress:"",
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
			State:"",
			ZipCode:"",
			number: '',
			myBirthDate:"",
			textInput: '',
			name: '',
			nameError:"",
			mobile:"",
			mobileError:""
			
			

		};
	}
	handleClickForm = (event) => {
		this.valid()
		this.setState({
			myaddress: this.state.address,
			MobileNo: document.getElementById("number").value,
			FirstName:document.getElementById("firstName").value,
			LastName:document.getElementById("lastName").value,
			EmailId:document.getElementById("email").value,
			State:document.getElementById("state").value,
			ZipCode:document.getElementById("zipcode").value,
			myBirthDate:document.getElementById("date").value

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
	onChangeErroHandle = (event) => {
		
		this.setState({ [event.target.name]:event.target.value});
	};
	onChangetextBox = (number,e) => {
		this.setState({
			number
			
		});
	};
	valid() {   
		if (!this.state.name.includes('@')) {
			this.setState({
				nameError: 'please @ is requared',
			});
		}
		// if(this.state.mobile)
	}
	myClickHandler = () =>{
		this.valid()
	}
	render() {
		return (
			<div className="container register">
				<div className="row">
					<div className="col-md-3 register-left">
						<img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
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
								<div className="row register-form">
									<div className="col-md-6">
										<div className="form-group">
                                            <label>FirstName</label>
											<MdbForm
												myDataInput="firstName"
												mytype="text"
												inputLenth={15}
												changeEventHandle={this.onChangetextBox}
											/>
											<p>{this.state.FirstName}</p>
										</div>
										<div className="form-group">
                                        <label>LastName</label>
											<MdbForm
												myDataInput="lastName"
												mytype="text"
												inputLenth={15}
												changeEventHandle={this.onChangetextBox}
											/>
											<p>{this.state.LastName}</p>
										</div>
										<div className="form-group">
                                        <label>Mobile No.</label>
											<MdbForm
												myDataInput="number"
												mytype="number"
												inputLenth={13}
												changeEventHandle={this.onChangetextBox}
											/>
											<p>{this.state.MobileNo}</p>
										</div>
										{/* <div className="form-group">
                                        <label>Email Id</label>
											<input
												type="email"
												className="form-control"
												placeholder="Your Email *"
												id="email"
											/>
											<p>{this.state.EmailId}</p>
										</div> */}
										<div className="form-group">
                                        <label>Email Id</label>
											<input
												className="form-control"
												type="text"
												name="name"
												id="email"
												placeholder="Your Email *"
												onChange={this.onChangeErroHandle}
											/>
											<p>{this.state.EmailId}</p>
											<p style={{color:"red",fontSize:"12px"}}>{this.state.nameError}</p>
										</div>
									</div>
									
									<div className="col-md-6">
                                    <label>City</label>
										<div className="form-group">
											<LocationSearchInput
												handleplace={this.handleChange}
												selectHandle={this.handleSelect}
												myValue={this.state.address}
												required
											/>
											<p>{this.state.myaddress}</p>
										</div>
										<div className="form-group">
                                        <label>State</label>
											<input
												className="form-control"
												type="text"
												id="state"
												value={this.state.myState[1]}
												placeholder="Enter State"
												readOnly
											/>
											<p>{this.state.State}</p>
										</div>
										{this.state.myCity.length === 3 ? (
											<div className="form-group">
                                                <label>Zip Code</label>
												<input
													value={this.state.myState[2]}
													placeholder="Zip Code"
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
                                        <label>Date Of Birth</label>
											<DatePicker
												onChangeEvent={this.handleDateChange}
												DateValue={this.state.birthDate}
											/>
											<p>{this.state.myBirthDate}</p>
										</div>
									</div>

									<div className="col-md-12">
										<div className="form-group">
                                        
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
										</div>
									</div>
									<div className="col-md-2">
										<div className="form-group">
											<Form.Label as="legend">Gender </Form.Label>
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
													<span> Male </span>
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
											<label className="lable">Hobby </label>
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
									>Register</Button>
									{/* <Button onClick={this.myClickHandler}>Click</Button> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
