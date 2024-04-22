import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { MyContext } from '../contexts/MyContext';

import swal from 'sweetalert';
import '../components/css/Myprofile.css';
class Myprofile extends Component {
	static contextType = MyContext; // using this.context to access global state
	constructor(props) {
		super(props);
		this.state = {
			txtUsername: '',
			txtPassword: '',
			txtName: '',
			txtPhone: '',
			txtEmail: ''
		};
	}
	render() {
		if (this.context.token === '') return (<Navigate replace to='/login' />);
		return (
			<div className="my-profile-container">
				<h2 className="my-profile-title">THÔNG TIN CÁ NHÂN</h2>
				<form>
					<table className="my-profile-table">
						<tbody>
							<tr>
								<td>Username</td>
								<td><input type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></td>
							</tr>
							{/* Các trường còn lại không thay đổi */}
							<tr>
								<td></td>
								<td><input type="submit" value="CẬP NHẬT" onClick={(e) => this.btnUpdateClick(e)} /></td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
		);
	}
	componentDidMount() {
		if (this.context.customer) {
			this.setState({
				txtUsername: this.context.customer.username,
				txtPassword: this.context.customer.password,
				txtName: this.context.customer.name,
				txtPhone: this.context.customer.phone,
				txtEmail: this.context.customer.email
			});
		}
	}
	// event-handlers
	btnUpdateClick(e) {
		e.preventDefault();
		const username = this.state.txtUsername;
		const password = this.state.txtPassword;
		const name = this.state.txtName;
		const phone = this.state.txtPhone;
		const email = this.state.txtEmail;
		if (username && password && name && phone && email) {
			const customer = { username: username, password: password, name: name, phone: phone, email: email };
			this.apiPutCustomer(this.context.customer._id, customer);
		} else {
			swal({
				title: "Please input username, password, name, phone and email",
				icon: "warning",
				button: "OK",
			});
		}
	}
	// apis
	apiPutCustomer(id, customer) {
		const config = { headers: { 'x-access-token': this.context.token } };
		axios.put('/api/customer/customers/' + id, customer, config).then((res) => {
			const result = res.data;
			if (result) {
				swal({
					title: "Updated successfully",
					icon: "success",
					button: "OK",
				});
				this.context.setCustomer(result);
			} else {
				swal({
					title: "Update failed",
					icon: "error",
					button: "OK",
				});
			}
		});
	}
}
export default Myprofile;