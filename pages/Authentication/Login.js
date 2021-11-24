import React, { useState } from 'react';

const Login = ({loginUser, auth}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return <div>
        <input type="email" value={email} onChange={e => setEmail(e.currentTarget.value)} />
        <input type="password" value={password} onChange={e => setPassword(e.currentTarget.value)} />
        <button onClick={() => loginUser(auth, email, password)}>Login</button>
        {/* Add register button */}
    </div>;
}

export default Login;