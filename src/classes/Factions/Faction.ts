export default class Faction {
    private _id: number;
    private _name: string;

    constructor({ id, name }: { id: number, name: string }){
        this._id = id;
        this._name = name;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string){
        this._name = name;
    }
} 