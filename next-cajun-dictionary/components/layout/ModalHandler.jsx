import classes from './modal.module.css';
import { useState, useContext } from 'react';
import ModalContext from '../../context/ModalContext';

export default function ModalHandler(props) {

    const { open, closeModal } = useContext(ModalContext);

    return (
        open ?
        <>
            <div className={classes.modal_wrapper}>
                <div className={classes.modal}>
                    <div className={classes.modal_body}>
                        {props.component}
                    </div>
                </div>
            </div>
            <div onClick={() => closeModal()} className={classes.modal_bg}></div>
        </>
        :
        <>{props.children}</>
    )
}
