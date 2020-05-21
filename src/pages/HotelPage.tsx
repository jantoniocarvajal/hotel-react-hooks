import * as React from 'react';
import { Hotel } from '../models';
import { saveHotel } from '../services/api';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { getHotel } from '../services/api';

interface RouteParams {
    id: string;
}

export function HotelPage() {
    const history = useHistory();
    const match = useRouteMatch<RouteParams>('/hotels/:id');

    const [entity, setEntity] = React.useState<Hotel>({} as Hotel);

    React.useEffect(() => {
        if (match) {
            loadHotel(match.params.id);
        }
    }, [match?.params.id])

    const loadHotel = (id: string) => {
        getHotel(id).then(hotel => setEntity(hotel));
    }

    function getSetter(propertyName: string) {
        return (ev: any) => {
            /** Update the property of the object hotel */
            const newEntity = {
                ...entity,
                [propertyName]: ev.target.value,
            };
            /** Update the state */
            setEntity(newEntity);
        }
    }

    function onSave() {
        saveHotel(entity);
        history.goBack();
    }

    function onCancel() {
        history.goBack();
    }

    return (
        <div>
            <h4>Name</h4>
            <input value={entity.name} onChange={getSetter("name")} />
            <h4>Address</h4>
            <input value={entity.address} onChange={getSetter("address")} />
            <h4>Phone</h4>
            <input value={entity.phone} onChange={getSetter("phone")} />
            <h4>Mail</h4>
            <input value={entity.mail} onChange={getSetter("mail")} />

            <button onClick={onSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}