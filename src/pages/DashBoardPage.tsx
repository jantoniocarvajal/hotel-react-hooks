import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { HotelsTable } from '../components/HotelsTable';
import { Hotel } from '../models';
import { getHotels } from '../services/api';
import { Pagination } from '../components/Pagination';
import { Filter } from '../components/Filter';

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

    const filter = (name: string, address: string) => {
        if (name === "" && address === "") {
            loadHotels();
        } else {
            const filterHotels = hotels.filter(h => (name !== "" ? h.name === name : h) && (address !== "" ? h.address === address : h))
            setHotels(filterHotels)
        }
    }

    const loadHotels = () => {
        getHotels().then(hotels => setHotels(hotels));
    }

    function onNewHotel() {
        history.push("/hotels");
    }

    return (
        <div>
            <h1>Bienvenid@</h1>

            <Filter filter={filter} />
            <HotelsTable hotels={currentHotels} onDelete={loadHotels} />
            <Pagination rowsByPage={rowsByPage} lenght={hotels.length} paginate={paginate} />

            <button onClick={onNewHotel}>New Hotel</button>
        </div>
    );
}