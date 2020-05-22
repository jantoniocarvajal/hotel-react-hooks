import express, { Application } from 'express';
import cors from 'cors';
import passport from 'passport';
import passportMiddleware  from './middlewares/passport';
import { configureIndexRoutes } from './routes/indexRoutes';
import { HotelRepository } from './repositories/hotels';
import { configureHotelRoutes } from './routes/hotelRoutes';
import { UserRepository } from './repositories/users';
import { configureUserRoutes } from './routes/userRoutes';

/** Class where we configure the server for backend */
class Server {
    public app: Application;

    constructor() {
        this.app = express();

        this.config();
        this.configureRoutes();
    }

    /** Configuration for express */
    private config(): void {
        this.app.set('port', process.env.PORT || process.env.port || 4000);

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());

        this.app.use(passport.initialize());
        passport.use(passportMiddleware);
    }

    /** Configuration for the routes of our api */
    private configureRoutes(): void {
        const hotelsRespository = new HotelRepository();
        const usersRepository = new UserRepository()

        configureUserRoutes(this.app, usersRepository);
        configureHotelRoutes(this.app, hotelsRespository);
        configureIndexRoutes(this.app);
    }

    /** Start the server */
    public start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port ', this.app.get('port'));
        });
    }
}

/** We create the server and start it. */
const server = new Server();
server.start();