import { Hotel } from '../models';

const apiUrl: string = 'http://localhost:4000/api/';

function checkStatus(response: Response): Promise<Response> {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return response.text().then(text => {
            throw new Error(`Status: ${response.status} - Message: ${text}`);
        })
    }
}

export function getHotels(): Promise<Hotel[]> {
    const uri: string = `${apiUrl}hotels`;

    return fetch(uri)
        .then((response) => checkStatus(response))
        .then<Hotel[]>((response) => response.json());
}

export function getHotel(id: string): Promise<Hotel> {
    const uri: string = `${apiUrl}hotels/${id}`;

    return fetch(uri)
        .then((response) => checkStatus(response))
        .then<Hotel>((response) => response.json());
}

export function saveHotel(hotel: Hotel): Promise<Hotel> {
    const uri = hotel.id ? `${apiUrl}hotels/${hotel.id}` : `${apiUrl}hotels`;

    return fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hotel)
    })
        .then((response) => checkStatus(response))
        .then<Hotel>(response => response.json());
}

export function deleteHotel(id: string) {
    const uri: string = `${apiUrl}hotels/${id}`;

    return fetch(uri, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json());
}

export function signIn(username:string, password: string) {
    const uri: string = `${apiUrl}users?username=${username}&password=${password}`;

    console.log("paso por aqui")
    return fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then((response) => checkStatus(response))
        .then(response => response.json());

}