import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authcontext/authcontext';
import { docreateUserWithEmailAndPassword } from '../../../firebase/auth';
import { useState } from 'react';

export default function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { userLoggedIn } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        setIsRegistering(true);

        try {
            await docreateUserWithEmailAndPassword(email, password);
            navigate('/home'); 
        } catch (error) {
            setErrorMessage(error.message);
            setIsRegistering(false);
        }
    };

    return (
        <section className="vh-100" style={{ backgroundImage:'url(https://en.idei.club/uploads/posts/2023-06/1685579281_en-idei-club-p-sky-blue-gradient-background-dizain-2.jpg)'}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">
                                <h3 className="mb-5">Create Account</h3>

                                <form onSubmit={onSubmit}>
                                    <div className="form-outline mb-4 text-start">
                                        <label className="form-label" htmlFor="email">Email</label>
                                        <input
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                            type="email"
                                            id="email"
                                            className="form-control form-control-lg"
                                        />
                                    </div>

                                    <div className="form-outline mb-4 text-start">
                                        <label className="form-label" htmlFor="password">Password</label>
                                        <input
                                            disabled={isRegistering}
                                            type="password"
                                            autoComplete="new-password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            id="password"
                                            className="form-control form-control-lg"
                                        />
                                    </div>

                                    <div className="form-outline mb-4 text-start">
                                        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                                        <input
                                            disabled={isRegistering}
                                            type="password"
                                            autoComplete="off"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm Password"
                                            id="confirmPassword"
                                            className="form-control form-control-lg"
                                        />
                                    </div>

                                    {errorMessage && (
                                        <div className="text-danger font-bold mb-3">{errorMessage}</div>
                                    )}

                                    <div className="text-sm text-center mb-3">
                                        Already have an account?{' '}
                                        <Link to="/login" className="font-bold">Login</Link>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg btn-block w-100"
                                        disabled={isRegistering}
                                    >
                                        {isRegistering ? 'Registering...' : 'Register'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
