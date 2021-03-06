import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { HotelsTable } from '../components/HotelsTable';
import { Hotel } from '../models';
import { getHotels, deleteHotel } from '../services/api';
import { Pagination } from '../components/Pagination';
import { Filter } from '../components/Filter';
import { useMapState } from '../contexts/MapState';

export function DashBoardPage() {
    const history = useHistory();

    const { mapState: { actualState }, setMapState } = useMapState()

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
        getHotels(actualState ? actualState.tokenApi : "").then(hotels => setHotels(hotels));
    }

    const onDeleteHotel = (id: string) => {
        deleteHotel(id, actualState ? actualState.tokenApi : "")
            .then(() => loadHotels())
    }

    function onNewHotel() {
        history.push("/hotels");
    }

    return (
        <div className="container">
            <div className="row">
                <h1>{`Bienvenid@ ${actualState?.userLogin?.name}`}</h1>
            </div>
            <div className="row">
                <Filter filter={filter} />
            </div>
            <div className="row">
                <HotelsTable hotels={currentHotels} onDelete={onDeleteHotel} />
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