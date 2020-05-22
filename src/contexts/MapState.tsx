import * as React from 'react';
import { User } from '../models';

export interface GlobalStore {
    userLogin: User | null;
    tokenApi: string;
}

type MapState = {
    actualState: GlobalStore | null;
}

type MapActions =
    | {
        type: 'setState';
        nextState: any;
    }
    | {
        type: 'resetState';
    }

const initialState: MapState = {
    actualState: null
}

const initialMapContext: { mapState: MapState; setMapState: React.Dispatch<MapActions> } = {
    mapState: initialState,
    setMapState: () => { }
};

const MapContext = React.createContext(initialMapContext);

const reducer = (state: MapState, action: MapActions) => {
    switch (action.type) {
        case 'setState':
            return {
                actualState: action.nextState,
            };

        case 'resetState':
            return {
                actualState: null
            }

        default:
            return state;
    }
}

export function MapProvider({ children }: any) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const mapState = state;
    const setMapState = dispatch;

    return <MapContext.Provider value={{ mapState, setMapState }}>
        {children}
    </MapContext.Provider>
}

export const useMapState = () => React.useContext(MapContext);