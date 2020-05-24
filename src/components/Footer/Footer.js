import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpeg';

const Footer = () => (
	<footer className='footer'>
		<ul>
			<li>
				<Link to='/offers'>
					<img alt='logo' src={logo} />
				</Link>
			</li>
			<li>CONTACT</li>
		</ul>
	</footer>
);

export default Footer;
