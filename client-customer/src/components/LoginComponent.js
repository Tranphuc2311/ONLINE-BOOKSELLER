import axios from 'axios';
import React, { Component } from 'react';
import { MyContext } from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/css/Login.css'; // Import file CSS tùy chỉnh

class Login extends Component {
	static contextType = MyContext; // using this.context to access global state
	constructor(props) {
		super(props);
		this.state = {
			txtUsername: '',
			txtPassword: ''
		};
	}
	render() {
		return (
			<div className="wrapper d-flex align-items-center justify-content-center" style={{ height: '70vh' }}>
				<div className="login-container">
					<h2 className='mb-3 text-center'>ĐĂNG NHẬP KHÁCH HÀNG</h2>
					<form>
						<div className="form-group mb-2">
							<label>Tên đăng nhập</label>
							<input
								type="text"
								className="form-control"
								required
								value={this.state.txtUsername}
								onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}
							/>
						</div>
						<div className="form-group mb-2">
							<label>Mật khẩu</label>
							<input
								type="password"
								className="form-control"
								required
								value={this.state.txtPassword}
								onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}
							/>
						</div>

						<button
							type="submit"
							className="btn btn-primary mt-3 w-100"
							value="ĐĂNG NHẬP"
							onClick={(e) => this.btnLoginClick(e)}
						>
							ĐĂNG NHẬP
						</button>
					</form>
				</div>
			</div>
		);
	}
	// event-handlers
	btnLoginClick(e) {
		e.preventDefault();
		const username = this.state.txtUsername;
		const password = this.state.txtPassword;
		if (username && password) {
			const account = { username: username, password: password };
			this.apiLogin(account);
		} else {
			swal({
				title: "Vui lòng nhập tên đăng nhập và mật khẩu",
				icon: "warning",
				button: "OK",
			});
		}
	}
	// apis
	apiLogin(account) {
		axios.post('/api/customer/login', account).then((res) => {
			const result = res.data;
			if (result.success === true) {
				this.context.setToken(result.token);
				this.context.setCustomer(result.customer);
				this.props.navigate('/home');
			} else {
				swal({
					title: "Tên đăng nhập hoặc mật khẩu không đúng",
					icon: "warning",
					button: "OK",
				});
			}
		});
	}
}
export default withRouter(Login);
