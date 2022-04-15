import classes from '../../styles/auth-form.module.css';
import { useRouter } from 'next/router';
import ModalHandler from '../../components/layout/ModalHandler';
import AuthForm from '../../components/forms/AuthForm';

export default function SessionsModal() {
    const router = useRouter();

    return <ModalHandler component={<AuthForm />} />
}
