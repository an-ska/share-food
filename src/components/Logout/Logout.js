import React from 'react';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { authLogout } from '../../store/actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Logout = () => {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(authLogout());

  return (
    <Button handleClick={onLogout}>
      <FontAwesomeIcon icon="power-off" />
    </Button>
  );
};

export default Logout;
