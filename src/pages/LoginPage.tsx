import * as React from 'react';
import { signIn } from '../services/api';
import { useMapState, GlobalStore } from '../contexts/MapState';
import { useHistory } from 'react-router-dom';

export function LoginPage() {
    const history = useHistory();
    const { mapState: { actualState }, setMapState } = useMapState()

    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [error, setError] = React.useState<boolean>(false)

    const onLogin = () => {
        if (username !== '' && password !== '') {
            setError(false);

            signIn(username, password).then(res => {
                const { user } = res;
                const { token } = res;

                const newState = {userLogin: user, tokenApi: token} as GlobalStore
                setMapState({ type: 'setState', nextState: { ...newState } })
                history.push("/dashboard");
            })
        } else {
            setError(true);
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