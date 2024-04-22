import axios from 'axios';
import React, { Component } from 'react';
import swal from 'sweetalert';
import '../components/css/Active.css'; // Import file CSS cho Active (đảm bảo đường dẫn đúng)

class Active extends Component {
	constructor(props) {
		super(props);
		this.state = {
			txtID: '',
			txtToken: ''
		};
	}

	render() {
		return (
			<div className="active-container">
				<h2 className="active-title">KÍCH HOẠT TÀI KHOẢN</h2>
				<form className="active-form">
					<div className="form-group">
						<label htmlFor="txtID">ID</label>
						<input
							type="text"
							id="txtID"
							value={this.state.txtID}
							onChange={(e) => { this.setState({ txtID: e.target.value }) }}
							placeholder="Nhập ID của bạn"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="txtToken">Token</label>
						<input
							type="text"
							id="txtToken"
							value={this.state.txtToken}
							onChange={(e) => { this.setState({ txtToken: e.target.value }) }}
							placeholder="Nhập token của bạn"
						/>
					</div>
					<button type="submit" onClick={(e) => this.btnActiveClick(e)}>KÍCH HOẠT</button>
				</form>
			</div>
		);
	}

	// event-handlers
	btnActiveClick(e) {
		e.preventDefault();
		const id = this.state.txtID;
		const token = this.state.txtToken;
		if (id && token) {
			this.apiActive(id, token);
		} else {
			swal({
				title: "Vui lòng nhập ID và token",
				icon: "warning",
				button: "OK",
			});
		}
	}

	// apis
	apiActive(id, token) {
		const body = { id: id, token: token };
		axios.post('/api/customer/active', body).then((res) => {
			const result = res.data;
			if (result) {
				swal({
					title: "Kích hoạt thành công!",
					icon: "success",
					button: "OK",
				});
			} else {
				swal({
					title: "Kích hoạt thất bại!",
					icon: "warning",
					button: "OK",
				});
			}
		});
	}
}

export default Active;
