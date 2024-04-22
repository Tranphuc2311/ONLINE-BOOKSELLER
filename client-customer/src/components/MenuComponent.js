import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import { MyContext } from '../contexts/MyContext';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../components/css/Menu.css';
class Menu extends Component {

	static contextType = MyContext;
	constructor(props) {
		super(props);
		this.state = {
			txtKeyword: '',
		};
	}
	render() {
		return (
			<Navbar expand="lg" className="bg-body-tertiary">
				<Container>
					<Navbar.Brand>
						<img
							alt=""
							src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149342941.jpg?w=2000"
							width="30"
							height="30"
							className="d-inline-block align-top"
						/>{' '}
						BookSonline
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto"></Nav> {/* khoảng trống*/}
						<Form className="d-flex align-middle">
							<Form.Control
								type="search"
								placeholder="Search"
								className="keyword me-2 flex-grow-2" value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }}
								aria-label="Search"
							/>
							<Button type="submit" value="SEARCH" variant="outline-success" onClick={(e) => this.btnSearchClick(e)}>Search</Button>
						</Form>
						<Nav className="me-auto"></Nav> {/* khoảng trống*/}
						<Nav className="float-right">
							{this.context.token === '' ?
								<Nav.Item>
									<Link to='/login' className='non'>Login</Link> | <Link to='/signup' className='non'>Sign-up</Link> | <Link to='/active' className='non'>Active</Link>
								</Nav.Item>
								:
								<NavDropdown title={this.context.customer.name} id="basic-nav-dropdown">
									<NavDropdown.Item><Link to='/myprofile' className='non'>My profile</Link></NavDropdown.Item>
									<NavDropdown.Item><Link to='/myorders' className='non'>My orders</Link></NavDropdown.Item>
									<NavDropdown.Item><Link to='/home' className='non' onClick={() => this.lnkLogoutClick()}>Logout</Link></NavDropdown.Item>
								</NavDropdown>
							}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
	// event-handlers
	btnSearchClick(e) {
		e.preventDefault();
		const keyword = this.state.txtKeyword.trim();
		if (keyword !== '') {
			this.props.navigate('/product/search/' + this.state.txtKeyword);
		} else {
			this.props.navigate('/home');
		}
	}

	lnkLogoutClick() {
		this.context.setToken('');
		this.context.setCustomer(null);
		this.context.setMycart([]);
	}
}
export default withRouter(Menu);