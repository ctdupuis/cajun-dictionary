import classes from '../../styles/auth-form.module.css';
import { useRouter } from 'next/router';

export default function AuthForm() {
    const router = useRouter();

    return (
    <>
        <div className={classes.modal_wrapper}>
            inside the wrapper
            <div className={classes.modal}>
            inside the modal
                <div className={classes.modal_head}>
                    inside the modal head
                </div>
            </div>
        </div>
        <div className={classes.modal_bg}></div>
    </>
    )
}
