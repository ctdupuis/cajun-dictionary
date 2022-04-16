import classes from './modal.module.css';
import { useContext } from 'react';
import ModalContext from '../../context/ModalContext';
import { AiOutlineClose } from 'react-icons/ai';

export default function ModalHandler(props) {

    const { component, setComponent } = useContext(ModalContext);

    return (
        component ?
        <>
            <div className={classes.modal_wrapper}>
                <div className={classes.modal}>
                    <div className={classes.modal_body}>
                    <AiOutlineClose className={classes.close} onClick={() => setComponent(undefined)} />
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
