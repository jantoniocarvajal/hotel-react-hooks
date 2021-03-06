import * as React from 'react';
import { signIn } from '../services/api';
import { useMapState, GlobalStore } from '../contexts/MapState';
import { useHistory } from 'react-router-dom';
import "../styles.scss";


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

                /** Save user and token in global store */
                const newState = {userLogin: user, tokenApi: token} as GlobalStore
                setMapState({ type: 'setState', nextState: { ...newState } })
                history.push("/dashboard");
            }).catch(
                error => setError(true)
            )
        } else {
            setError(true);
        }
    }

    return (
        <div className="login">
            <div className="row">
                <label>Username</label>
                <input value={username} placeholder="username" onChange={(ev: any) => setUsername(ev.target.value)} />
            </div>
            <div className="row">
                <label>Password</label>
                <input value={password} type="password" placeholder="password" onChange={(ev: any) => setPassword(ev.target.value)} />
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