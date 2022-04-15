import classes from './modal.module.css';
import { useState } from 'react';

export default function ModalHandler(props) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        isOpen ?
        <>
            <div className={classes.modal_wrapper}>
                <div className={classes.modal}>
                    <div className={classes.modal_body}>
                        {props.component}
                    </div>
                </div>
            </div>
            <div className={classes.modal_bg}></div>
        </>
        :
        <>{props.children}</>
    )
}
