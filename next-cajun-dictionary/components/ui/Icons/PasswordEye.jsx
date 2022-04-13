import React, { Fragment } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './password-eye.module.css';

export default function PasswordEye({ showPassword, handleClick }) {

    return (
        <Fragment>
            {
            showPassword === 'password' ? 
            <FaEyeSlash className={styles.eye} onClick={handleClick} /> 
            : 
            <FaEye className={styles.eye} onClick={handleClick} />
            }
        </Fragment>
    )
}
