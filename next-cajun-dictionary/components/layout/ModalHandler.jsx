import classes from './modal.module.css';
import { useContext } from 'react';
import ModalContext from '../../context/ModalContext';

export default function ModalHandler(props) {

    const { component, setComponent } = useContext(ModalContext);

    return (
        component ?
        <>
            <div className={classes.modal_wrapper}>
                <div className={classes.modal}>
                    <div className={classes.modal_body}>
                        {component}
                    </div>
                </div>
            </div>
            <div onClick={() => setComponent(false)} className={classes.modal_bg}></div>
        </>
        :
        <>{props.children}</>
    )
}
