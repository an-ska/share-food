import React from "react";
import Button from '../../../components/Button/Button';
import { useDispatch } from "react-redux";
import { authLogout } from "../../../store/actions/auth";

const Logout = () => {
    const dispatch = useDispatch();
    const onLogout = () => dispatch(authLogout());

    return <Button handleClick={onLogout}>Logout</Button>;
}

export default Logout
