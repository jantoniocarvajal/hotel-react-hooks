import { Application, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { UserRepository } from '../repositories/users';
import { User } from '../../src/models';

export function configureUserRoutes(app: Application, repository: UserRepository): void {
    app.route('/api/users')
        .get(getUsers)
        .post(signIn);

    app.route('/api/users/:userId')
        .get(getUser);

    async function getUsers(req: Request, res: Response) {
        const users = await repository.getAll();
        res.status(200).send(users);
    }

    async function getUser(req: Request, res: Response) {
        const id = req.params.userId;
        const user = await repository.get(id);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(400).send(`User ID:${id} not found.`);
        }
    }

    async function signIn(req: Request, res: Response) {
        const username = req.query.username as string;
        const password = req.query.password as string;

        if (!username || !password) {
            return res.status(400).send(`You maybe send username and password.`);
        }

        const user = await repository.findUser(username, password);
        if (!user) {
            return res.status(404).send(`Username or password invalid.`);
        }

        return res.status(200).send({ user: user, token: createToken(user) });
    }

    function createToken(user: User) {
        return jwt.sign({
            id: user.id,
            username: user.userName,
            name: user.name
        }, config.jwtSecret);
    }
}

