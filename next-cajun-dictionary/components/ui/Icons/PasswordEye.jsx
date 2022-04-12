import React, { Fragment } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function PasswordEye({ showPassword, handleClick }) {


    return (
        <Fragment>
            {
            showPassword === 'password' ? 
            <FaEyeSlash onClick={handleClick} /> 
            : 
            <FaEye onClick={handleClick} />
            }
        </Fragment>
    )
}
