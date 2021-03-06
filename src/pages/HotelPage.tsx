import * as React from 'react';
import { Hotel } from '../models';
import { saveHotel } from '../services/api';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { getHotel } from '../services/api';
import "../styles.scss";
import { useMapState } from '../contexts/MapState';

interface RouteParams {
    id: string;
}

export function HotelPage() {
    const { mapState: { actualState }, setMapState } = useMapState()

    const history = useHistory();
    /** Get the param id of the url */
    const match = useRouteMatch<RouteParams>('/hotels/:id');

    const [entity, setEntity] = React.useState<Hotel>({} as Hotel);
    const [showError, setShowError] = React.useState<boolean>(false);

    /** Only execte with change the param id in the url */
    React.useEffect(() => {
        if (match) {
            loadHotel(match.params.id);
        }
    }, [match?.params.id])

    const loadHotel = (id: string) => {
        getHotel(id, actualState ? actualState.tokenApi : "").then(hotel => setEntity(hotel));
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
        saveHotel(entity, actualState ? actualState.tokenApi : "")
            .then(() => history.goBack())
            .catch(() => setShowError(true));
    }

    function onCancel() {
        history.goBack();
    }

    return (
        <div className="form">
            <div className="row">
                <h2>{entity.id ? "Edit Hotel" : "New Hotel"}</h2>
            </div>
            <div className="row">
                <label>Name</label>
                <input value={entity.name} onChange={getSetter("name")} />
            </div>
            <div className="row">
                <label>Address</label>
                <input value={entity.address} onChange={getSetter("address")} />
            </div>
            <div className="row">
                <label>Phone</label>
                <input value={entity.phone} onChange={getSetter("phone")} />
            </div>
            <div className="row">
                <label>Mail</label>
                <input value={entity.mail} onChange={getSetter("mail")} />
            </div>
            <div className="row">
                <button onClick={onSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
            {
                showError && <h4>El nombre del hotel ya existe.</h4>
            }
        </div>
    );
}