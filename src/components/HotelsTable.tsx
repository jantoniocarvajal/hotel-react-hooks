import * as React from 'react';
import { Hotel } from '../models';
import { useHistory } from 'react-router-dom';
import "../styles.scss";


interface HotelsTableProps {
    hotels: Hotel[];
    onDelete: (id: string) => void;
}

export const HotelsTable = ({ hotels, onDelete }: HotelsTableProps) => {
    const history = useHistory();

    const onEditHotel = (id: string) => {
        history.push(`/hotels/${id}`);
    }

    const onDeleteHotel = (id: string) => {
        onDelete(id);
    }

    return (
        <div>
            <h3>Listado de hoteles</h3>
            <table className="list-hotels card-hotels">
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
                                    <button className="button delete" onClick={() => {if(window.confirm('Delete the hotel?')){onDeleteHotel(hotel.id)};}}>Delete</button>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
}