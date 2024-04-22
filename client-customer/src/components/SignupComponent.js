import axios from 'axios';
import React, { Component } from 'react';
import swal from 'sweetalert';
import withRouter from '../utils/withRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/css/Signup.css'

class Signup extends Component {
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
		return (
			<div className="wrapper bg-opacity-10 d-flex align-items-center justify-content-center w-100" style={{ height: '70vh' }}>
				<div className="login-container">
					<h2 className='mb-3 text-center' style={{ fontSize: '20px' }}>ĐĂNG KÝ TÀI KHOẢN</h2>
					<form>
						<div className="form-group was-validated mb-2">
							<label>Tên tài khoản</label>
							<input
								type="text"
								className="form-control" required
								value={this.state.txtUsername}
								onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}
							/>
						</div>
						<div className="form-group was-validated mb-2">
							<label>Mật khẩu</label>
							<input
								type="password"
								className="form-control" required
								value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}
							/>
						</div>
						<div className="form-group was-validated mb-2">
							<label>Họ và tên</label>
							<input
								type="text"
								className="form-control" required
								value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }}
							/>
						</div>
						<div className="form-group was-validated mb-2">
							<label>Số điện thoại</label>
							<input
								type="tel"
								className="form-control" required
								value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }}
							/>
						</div>
						<div className="form-group was-validated mb-2">
							<label>Email</label>
							<input
								type="email"
								className="form-control" required
								value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }}
							/>
						</div>

						<button
							type="submit"
							className="btn btn-primary mt-2 w-100"
							value="ĐĂNG KÝ" onClick={(e) => this.btnSignupClick(e)}
						>
							ĐĂNG KÝ
						</button>

					</form>
				</div>
			</div>
		);
	}

	// Xử lý khi nhấn nút ĐĂNG KÝ
	btnSignupClick(e) {
		e.preventDefault();
		const username = this.state.txtUsername;
		const password = this.state.txtPassword;
		const name = this.state.txtName;
		const phone = this.state.txtPhone;
		const email = this.state.txtEmail;
		if (username && password && name && phone && email) {
			const account = { username: username, password: password, name: name, phone: phone, email: email };
			this.apiSignup(account);
		} else {
			swal({
				title: "Vui lòng điền đầy đủ thông tin",
				icon: "warning",
				button: "OK",
			});
		}
	}

	// Gọi API đăng ký tài khoản
	apiSignup(account) {
		axios.post('/api/customer/signup', account).then((res) => {
			const result = res.data;
			alert(result.message);
			this.props.history.push('/login');
		});
	}
}

export default withRouter(Signup);
