import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../contexts/MyContext';

import withRouter from '../utils/withRouter';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
class Inform extends Component {
	static contextType = MyContext;
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			txtKeyword: ''
		};
	}
	render() {
		const cates = this.state.categories.map((item) => {
			return (
				// <li key={item._id} className="menu"><Link to={'/product/category/' + item._id}>{item.name}</Link></li>
				<NavDropdown.Item key={item._id}><Link to={'/product/category/' + item._id} className='non'>{item.name}</Link></NavDropdown.Item>
			);
		});
		return (
			<Navbar expand="lg" className="bg-body-tertiary">
				<Container>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link><Link to='/' className='non'>Home</Link></Nav.Link>
							<NavDropdown title="Category" id="basic-nav-dropdown">
								{cates}
							</NavDropdown>
						</Nav>
						<Nav className="float-right">
							<Nav.Item><Link to='/mycart' className='non'>My cart</Link> have <b>{this.context.mycart.length}</b> items</Nav.Item>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
	componentDidMount() {
		this.apiGetCategories();
	}
	// apis
	apiGetCategories() {
		axios.get('/api/customer/categories').then((res) => {
			const result = res.data;
			this.setState({ categories: result });
		});
	}
}
export default withRouter(Inform);