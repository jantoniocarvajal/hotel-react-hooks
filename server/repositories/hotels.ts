import { v4 as uuid } from "uuid";
import { Hotel } from '../../src/models';
import { findById, findIndex } from './helper';

export class HotelRepository {
    private hotels: Hotel[] = [];

    public getAll(): Promise<Hotel[]> {
        return Promise.resolve(this.hotels.map(hotel => ({ ...hotel })));
    }

    public get(id: string): Promise<Hotel> {
        const hotel = findById(id, this.hotels);
        if (hotel) {
            return Promise.resolve({ ...hotel });
        } else {
            throw new Error(`Hotel ID:${id} not found.`)
        }
    }

    public save(data: Hotel): Promise<Hotel | undefined> {
        const hotel: Hotel = {
            ...data
        };

        if (hotel.id) {
            const index = findIndex(hotel.id, this.hotels);
            if (index > -1) {
                this.hotels[index] = hotel;
            } else {
                return Promise.resolve(undefined);
            }
        } else {
            hotel.id = uuid();
            this.hotels.push(hotel);
        }

        return Promise.resolve(hotel);
    }
}