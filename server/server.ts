import express, { Application } from 'express';
import { configureIndexRoutes } from './routes/indexRoutes';
import { HotelRepository } from './repositories/hotels';
import { configureHotelRoutes } from './routes/hotelRoutes';

/** Class where we configure the server for backend */
class Server {
    public app: Application;

    private hotelsRespository = new HotelRepository();

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
    }

    /** Configuration for the routes of our api */
    private configureRoutes(): void {
        configureIndexRoutes(this.app);
        configureHotelRoutes(this.app, this.hotelsRespository);
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