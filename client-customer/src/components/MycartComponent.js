import React, { Component } from "react";
import { MyContext } from '../contexts/MyContext';
import CartUtil from "../utils/CartUtil";
import axios from "axios";
import withRouter from "../utils/withRouter";
import swal from "sweetalert";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import '../components/css/Mycart.css';

class Mycart extends Component {
	static contextType = MyContext; // using this.context to access global state
	render() {
		const mycart = this.context.mycart.map((item, index) => {
			return (
				<tr key={item.product._id}>
					<td>{index + 1}</td>
					<td>{item.product._id}</td>
					<td>{item.product.name}</td>
					<td>{item.product.category.name}</td>
					<td>
						<img
							src={"data:image/jpg;base64," + item.product.image}
							width="70px"
							height="70px"
							alt=""
						/>
					</td>
					<td>{item.product.author}</td>
					<td>{item.product.price}</td>
					<td>{item.quantity}</td>
					<td>{item.product.price * item.quantity}</td>
					<td>
						<Button variant="danger"
							onClick={() => this.lnkRemoveClick(item.product._id)}
						>
							Remove
						</Button>
					</td>
				</tr>
			);
		});
		return (
			<div className="align-center">
				<h2 className="text-center">DANH SÁCH SẢN PHẨM TRONG GIỎ HÀNG</h2>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>STT</th>
							<th>ID</th>
							<th>Tên sản phẩm</th>
							<th>Thể loại</th>
							<th>Ảnh</th>
							<th>Tác giả</th>
							<th>Giá</th>
							<th>Số lượng</th>
							<th>Tổng tiền</th>
							<th>Hành động</th>
						</tr>
					</thead>
					<tbody>
						{mycart}
						<tr>
							<td colSpan="7"></td>
							<td>Tổng cộng</td>
							<td>{CartUtil.getTotal(this.context.mycart)}</td>
							<td>
								<Button className="link" onClick={() => this.lnkCheckoutClick()}>
									THANH TOÁN
								</Button>
							</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	}
	// event-handlers
	lnkRemoveClick(id) {
		const mycart = this.context.mycart;
		const index = mycart.findIndex((x) => x.product._id === id);
		if (index !== -1) {
			// found, remove item
			mycart.splice(index, 1);
			this.context.setMycart(mycart);
		}
	}
	lnkCheckoutClick() {
		swal({
			title: "Are you sure?",
			text: "Once checkout, you will not be able to redo this!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willCheckout) => {
			if (willCheckout) {
				if (this.context.mycart.length > 0) {
					const total = CartUtil.getTotal(this.context.mycart);
					const items = this.context.mycart;
					const customer = this.context.customer;
					if (customer) {
						this.apiCheckout(total, items, customer);
					} else {
						this.props.navigate("/login");
					}
				} else {
					swal({
						title: "Your cart is empty",
						icon: "warning",
						button: "OK",
					});
				}
			}
		});
	}
	// apis
	apiCheckout(total, items, customer) {
		const body = { total: total, items: items, customer: customer };
		const config = { headers: { "x-access-token": this.context.token } };
		axios.post("/api/customer/checkout", body, config).then((res) => {
			const result = res.data;
			if (result) {
				this.context.setMycart([]);
				this.props.navigate("/home");
			} else {
				alert("Checkout failed");
			}
		});
	}
}
export default withRouter(Mycart);
