import React, { useState } from 'react';
import { signUpUtil } from '../../utils/cognitoAuth';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Both fields are required.');
            return;
        }

        console.log('Signup attempted with:', { email, password });
        setError('');

        signUpUtil(email, password).then(res => console.log(res)).catch((err) => {
            console.error(err)
        });
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
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

                <button type="submit">Sign up</button>
            </form>
        </div>
    );
};

export default Signup;