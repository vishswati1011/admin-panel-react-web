import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/action/userAction';
import styles from './login.module.css';
import classNames from 'classnames';
import { useAlert } from 'react-alert';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const alert = useAlert();

    const formHandler = useCallback(
        async e => {
            e.preventDefault();
            setLoading(true);
            try {
                const userLoginCredentials = { email, password };
                dispatch(
                    userLogin(userLoginCredentials, navigate, data => {
                        alert.success(data);
                    })
                );
            } catch (error) {
                console.error('Login failed', error);
            } finally {
                setLoading(false);
            }
        },
        [email, password, dispatch, navigate]
    );

    return (
        <div className={styles.login_page}>
            <div className={styles.login_page_left}>
                <div className={styles.login_page_main}>
                    <p className={styles.login_page_header}>Login</p>
                    <form onSubmit={formHandler} className={styles.login_page_input_form}>
                        <input
                            required
                            className={styles.login_page_input}
                            placeholder="Enter Company e-mail"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <div className={styles.login_page_password_container}>
                            <input
                                required
                                className={styles.login_page_input}
                                placeholder="Enter Password"
                                // type={showPassword ? 'text' : 'password'}
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            {/* <button
                                className={styles.login_page_password_visibility}
                                onClick={setShowPassword.bind(this, !showPassword)}
                            >
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </button> */}
                        </div>

                        <button
                            type="submit"
                            className={classNames(styles.login_button, 'btn-outline')}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
