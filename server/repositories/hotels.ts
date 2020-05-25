import { v4 as uuid } from "uuid";
import { Hotel } from '../../src/models';
import { findById, findIndex } from './helper';

export class HotelRepository {
    private hotels: Hotel[] = [];

    /** Get if the name of a hotel is duplicate */
    public isDuplicateName(hotel: Hotel): boolean {
        /** If in the database have a hotel with equal name and distint id, the name is duplicate  */
        const index = this.hotels.findIndex(h => h.name === hotel.name && h.id !== hotel.id);
        return index !== -1;
    }

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

    public delete(id: string): Promise<Hotel | null> {
        const hotel = findById(id, this.hotels);
        /** If exists the hotel, we delete it */
        if (hotel) {
            this.hotels = this.hotels.filter(hotel => hotel.id !== id);
        }
        return Promise.resolve(hotel);
    }
}