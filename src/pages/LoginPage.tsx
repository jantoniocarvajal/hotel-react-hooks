import * as React from 'react';
import { signIn } from '../services/api';

export function LoginPage() {
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [error, setError] = React.useState<boolean>(false)

    const onLogin = () => {
        console.log("hago login")
        if (username !== '' && password !== '') {
            console.log(username)
            console.log(password)

            signIn(username, password).then(res => {
                const {user} = res;
                const {token} = res;
                console.log(user)
                console.log(token)
            })
        } else {
            setError(true)
        }
    }

    return (
        <div className="container">
            <div className="row">
                <label>Username</label>
                <input value={username} onChange={(ev: any) => setUsername(ev.target.value)} />
            </div>
            <div className="row">
                <label>Password</label>
                <input value={password} onChange={(ev: any) => setPassword(ev.target.value)} />
            </div>
            <div className="row">
                <button onClick={onLogin}>Login</button>
            </div>
            {
                error && <h4>El nombre de usuario y/o password no son válidos</h4>
            }
        </div>
    );
}