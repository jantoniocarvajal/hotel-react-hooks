import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { HotelsTable } from '../components/HotelsTable';
import { Hotel } from '../models';
import { getHotels } from '../services/api';
import { Pagination } from '../components/Pagination';

export function DashBoardPage() {
    const history = useHistory();

    const [hotels, setHotels] = React.useState<Hotel[]>([]);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [rowsByPage] = React.useState<number>(10);

    React.useEffect(() => {
        loadHotels();
    }, []);

    /** Get current hotels */
    const indexLastHotel = currentPage * rowsByPage;
    const indexFirsHotel = indexLastHotel - rowsByPage;
    const currentHotels = hotels.slice(indexFirsHotel, indexLastHotel);

    /** Change Page */
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const loadHotels = () => {
        getHotels().then(hotels => setHotels(hotels));
    }

    function onNewHotel() {
        history.push("/hotels");
    }

    return (
        <div>
            <h1>Bienvenid@</h1>

            <HotelsTable hotels={currentHotels} onDelete={loadHotels} />
            <Pagination rowsByPage={rowsByPage} lenght={hotels.length} paginate={paginate} />

            <button onClick={onNewHotel}>New Hotel</button>
        </div>
    );
}