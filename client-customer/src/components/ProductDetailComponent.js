import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import { MyContext } from '../contexts/MyContext';
import swal from 'sweetalert';
import '../components/css/ProductDetail.css'

class ProductDetail extends Component {
	static contextType = MyContext; // using this.context to access global state
	constructor(props) {
		super(props);
		this.state = {
			product: null,
			txtQuantity: 1
		};
	}
	render() {
		const prod = this.state.product;
		if (prod != null) {
			return (
				<div className="product-detail-container">
					<h2 className="product-detail-title">THÔNG TIN CHI TIẾT SẢN PHẨM</h2>
					<div className="product-detail-content">
						<figure className="product-detail-image">
							<img src={"data:image/jpg;base64," + prod.image} alt="" />
						</figure>
						<div className="product-detail-info">
							<table>
								<tbody>
									<tr>
										<td>ID:</td>
										<td>{prod._id}</td>
									</tr>
									<tr>
										<td align="right">Name:</td>
										<td>{prod.name}</td>
									</tr>
									<tr>
										<td align="right">Price:</td>
										<td>{prod.price}</td>
									</tr>
									<tr>
										<td align="right">Category:</td>
										<td>{prod.category.name}</td>
									</tr>
									<tr>
										<td align="right">Quantity:</td>
										<td><input type="number" min="1" max="99" value={this.state.txtQuantity} onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }} /></td>
									</tr>
									<tr>
										<td></td>
										<td><input type="submit" value="THÊM VÀO GIỎ HÀNG" onClick={(e) => this.btnAdd2CartClick(e)} /></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			);
		}
		return (<div />);
	}
	// event-handlers
	btnAdd2CartClick(e) {
		e.preventDefault();
		const product = this.state.product;
		const quantity = parseInt(this.state.txtQuantity);
		if (quantity) {
			const mycart = this.context.mycart;
			const index = mycart.findIndex(x => x.product._id === product._id); // check if the _id exists in mycart
			if (index === -1) { // not found, push newItem
				const newItem = { product: product, quantity: quantity };
				mycart.push(newItem);
			} else { // increasing the quantity
				mycart[index].quantity += quantity;
			}
			this.context.setMycart(mycart);
			//this.props.navigate('/home');
			//alert('OK BABY!');
		} else {
			swal('Error', 'Invalid quantity!', 'error');
		}
	}
	componentDidMount() {
		const params = this.props.params;
		this.apiGetProduct(params.id);
	}
	// apis
	apiGetProduct(id) {
		axios.get('/api/customer/products/' + id).then((res) => {
			const result = res.data;
			this.setState({ product: result });
		});
	}
}
export default withRouter(ProductDetail);