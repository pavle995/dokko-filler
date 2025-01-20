import React, { useState } from 'react';
import { signInUtil } from '../../utils/cognitoAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setError('Both fields are required.');
            return;
        }

        // Simulate login logic
        console.log('Login attempted with:', { email, password });
        setError(''); 

        signInUtil(email, password).catch((err) => {
            console.log(err)
        });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && <p>{error}</p>}

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;