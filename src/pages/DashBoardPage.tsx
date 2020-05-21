import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { HotelsTable } from '../components/HotelsTable';
import { Hotel } from '../models';
import { getHotels } from '../services/api';

export function DashBoardPage() {
    const history = useHistory();

    const [hotels, setHotels] = React.useState<Hotel[]>([]);

    React.useEffect(() => {
        loadHotels();
    }, []);

    const loadHotels = () => {
        getHotels().then(hotels => setHotels(hotels));
    }

    function onNewHotel() {
        history.push("/hotels");
    }

    return (
        <div>
            <h1>Bienvenid@</h1>

            <HotelsTable hotels={hotels} />

            <button onClick={onNewHotel}>New Hotel</button>
        </div>
    );
}