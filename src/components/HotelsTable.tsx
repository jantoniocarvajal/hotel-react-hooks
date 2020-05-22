import * as React from 'react';
import { Hotel } from '../models';
import { useHistory } from 'react-router-dom';
import { deleteHotel } from '../services/api';
import "../styles.scss";


interface HotelsTableProps {
    hotels: Hotel[];
    onDelete: () => void;
}

export const HotelsTable = ({ hotels, onDelete }: HotelsTableProps) => {
    const history = useHistory();

    const onEditHotel = (id: string) => {
        history.push(`/hotels/${id}`);
    }

    const onDeleteHotel = (id: string) => {
        deleteHotel(id).then(() => onDelete())
    }

    return (
        <div>
            <h3>Listado de hoteles</h3>
            <table className="list-hotels">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Mail</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        hotels.map(hotel =>
                            <tr key={hotel.id}>
                                <th>{hotel.id}</th>
                                <td>{hotel.name}</td>
                                <td>{hotel.address}</td>
                                <td>{hotel.phone}</td>
                                <td>{hotel.mail}</td>
                                <td>
                                    <button className="button update" onClick={() => onEditHotel(hotel.id)}>Edit</button>
                                    <button className="button delete" onClick={() => onDeleteHotel(hotel.id)}>Delete</button>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
}