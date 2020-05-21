import * as React from 'react';
import { Hotel } from '../models';
import { useHistory } from 'react-router-dom';

interface HotelsTableProps {
    hotels: Hotel[];
}

export const HotelsTable = ({ hotels }: HotelsTableProps) => {
    const history = useHistory();

    const onEdit = (id: string) => {
        history.push(`/hotels/${id}`);
    }

    const onDelete = (id: string) => {
        console.log(id)
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Mail</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        hotels.map(hotel =>
                            <tr key={hotel.id}>
                                <td>{hotel.name}</td>
                                <td>{hotel.address}</td>
                                <td>{hotel.phone}</td>
                                <td>{hotel.mail}</td>
                                <td>
                                    <button className="button muted-button" onClick={() => onEdit(hotel.id)}>Edit</button>
                                    <button className="button muted-button" onClick={() => onDelete(hotel.id)}>Delete</button>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
}