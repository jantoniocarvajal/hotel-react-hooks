type WithId = { id: string };

export function findById<T extends WithId>(id: string, collection: T[]): T | null {
    let index = findIndex(id, collection);
    if (index > -1) {
        return collection[index];
    }
    return null;
}

export function findIndex<T extends WithId>(id: string, collection: T[]): number {
    return collection.findIndex(obj => obj.id === id);
}