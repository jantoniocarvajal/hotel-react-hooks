import { User } from "../../src/models";
import { findById } from './helper';

export class UserRepository {
    private users: User[] = [{ id: "101", userName: "user", password: "user", name: "Usuario" }];

    public getAll(): Promise<User[]> {
        return Promise.resolve(this.users.map(user => ({ ...user })));
    }

    public get(id: string): Promise<User> {
        const user = findById(id, this.users);
        if (user) {
            return Promise.resolve({ ...user });
        } else {
            throw new Error(`User ID:${id} not found.`)
        }
    }

    public findUser(username: string, password: string): Promise<User> | null {
        const index = this.users.findIndex(user => user.userName === username && user.password === password);

        if (index > -1) {
            const user = this.users[index];
            return Promise.resolve({ ...user });
        } else {
            return null;
        }
    }
}