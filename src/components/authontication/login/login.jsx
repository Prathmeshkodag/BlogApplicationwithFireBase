import React, { useState } from 'react'
import { useAuth } from '../../../context/authcontext/authcontext'
import { loginWithEmailAndPassword, loginWithGoogle } from '../../../firebase/auth'
import { Navigate, useNavigate } from 'react-router-dom'

function Login() {
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await loginWithEmailAndPassword(email, password);
                navigate('/home'); 
            } catch (error) {
                setErrorMessage(error.message);
                setIsSigningIn(false);
            }
        }
    };

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await loginWithGoogle();
                navigate('/home');
            } catch (error) {
                setErrorMessage(error.message);
                setIsSigningIn(false);
            }
        }
    };

    return (
        <>
            {userLoggedIn && <Navigate to="/home" replace />}
            <section className="vh-100" style={{ backgroundImage:'url(https://en.idei.club/uploads/posts/2023-06/1685579281_en-idei-club-p-sky-blue-gradient-background-dizain-2.jpg)'}}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-5 text-center">
                                    <h3 className="mb-5">Sign in</h3>

                                    <div className="form-outline mb-4 text-start font-weight-bold text-dark fs-3">
                                        <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                                        <input
                                            autoComplete="email"
                                            required
                                            value={email} onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email" type="email" id="typeEmailX-2"
                                            className="form-control form-control-lg"
                                        />
                                    </div>

                                    <div className="form-outline mb-4 text-start font-weight-bold text-dark fs-3">
                                        <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                                        <input
                                            autoComplete="current-password"
                                            required
                                            value={password} onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password" type="password" id="typePasswordX-2"
                                            className="form-control form-control-lg"
                                        />
                                    </div>

                                    {errorMessage && (
                                        <span className="text-red-600 font-bold">{errorMessage}</span>
                                    )}

                                    <button
                                        className="btn btn-primary btn-lg btn-block w-100"
                                        type="submit"
                                        onClick={onSubmit}
                                        disabled={isSigningIn}
                                    >
                                        {isSigningIn ? 'Signing In...' : 'Sign In'}
                                    </button>

                                    <p className="text-center text-muted mt-5 mb-0">
                                        Don't have an account? <a href="/singup">Sign up</a>
                                    </p>

                                    <hr className="my-4" />

                                    <button
                                        className="btn btn-outline-info btn-lg btn-block btn-light w-85 "
                                        type="submit"
                                        onClick={onGoogleSignIn}
                                        disabled={isSigningIn}
                                    >
                                        <img src="https://w7.pngwing.com/pngs/63/1016/png-transparent-google-logo-google-logo-g-suite-chrome-text-logo-chrome-thumbnail.png" width="20px" height="20px" alt="Google" /> Sign in with Google
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
