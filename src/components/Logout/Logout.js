import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button/Button';
import { authLogout } from '../../store/actions/auth';

const Logout = () => {
	const dispatch = useDispatch();
	const onLogout = () => dispatch(authLogout());

	return (
		<Button handleClick={onLogout}>
			<FontAwesomeIcon icon='power-off' />
		</Button>
	);
};

export default Logout;
