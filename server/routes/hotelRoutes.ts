import { Application, Request, Response } from 'express';
import { Hotel } from '../../src/models';
import { HotelRepository } from '../repositories/hotels';
import passport from 'passport';

export function configureHotelRoutes(app: Application, repository: HotelRepository): void {
    app.route('/api/hotels')
        .get(getHotels, passport.authenticate('jwt'))
        .post(saveHotel, passport.authenticate('jwt'));

    app.route('/api/hotels/:hotelId')
        .get(getHotel, passport.authenticate('jwt'))
        .post(saveHotel, passport.authenticate('jwt'))
        .delete(deleteHotel, passport.authenticate('jwt'));

    async function getHotels(req: Request, res: Response) {
        const hotels = await repository.getAll();
        res.status(200).send(hotels);
    }

    async function getHotel(req: Request, res: Response) {
        const id = req.params.hotelId;
        const hotel = await repository.get(id);
        if (hotel) {
            res.status(200).send(hotel);
        } else {
            res.status(400).send(`Hotel ID:${id} not found.`);
        }
    }

    async function saveHotel(req: Request, res: Response) {
        const id = req.params.hotelId;
        const hotel: Hotel = { ...req.body };

        const isDuplicate = repository.isDuplicateName(hotel);

        if (isDuplicate) {
            res.status(400).send("Hotel name duplicate.")
        } else {
            if (hotel.id === id) {
                const saved = await repository.save(hotel);
                if (saved) {
                    res.status(200).send(saved);
                } else {
                    res.status(404).send(`Hotel ID:${id} not found.`);
                }
            } else {
                res.status(400).send(`ID:${hotel.id} doesn't match with ID:${id} of the URL.`);
            }
        }
    }

    async function deleteHotel(req: Request, res: Response) {
        const id = req.params.hotelId;
        const deleted = await repository.delete(id);

        if (deleted) {
            res.status(200).send(`Hotel ID:${id} delete.`)
        } else {
            res.status(404).send(`Hotel ID:${id} not found.`);
        }
    }

}