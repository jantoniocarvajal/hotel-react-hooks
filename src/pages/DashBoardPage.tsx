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
        <div className="container">
            <div className="row">
                <h1>Bienvenid@</h1>
            </div>
            <div className="row">
                <Filter filter={filter} />
            </div>
            <div className="row">
                <HotelsTable hotels={currentHotels} onDelete={loadHotels} />
            </div>
            <div className="row">
                <Pagination rowsByPage={rowsByPage} lenght={hotels.length} paginate={paginate} />
            </div>
            <div className="row">
                <button onClick={onNewHotel}>New Hotel</button>
            </div>
        </div>
    );
}