import { INITIAL_ALIVE, INITIAL_HEALTHPOINT, INITIAL_LEVEL } from "../config/constants";
export default class Character {
    private _healthPoint: number;
    private _level: number;
    private _isAlive: boolean;

    constructor(){
        this._healthPoint = INITIAL_HEALTHPOINT;
        this._level = INITIAL_LEVEL;
        this._isAlive = INITIAL_ALIVE;
    }

    get healthPoint(): number {
        return this._healthPoint;
    }

    set healthPoint(healthPoint: number){
        this._healthPoint = healthPoint;
    }

    get level(): number {
        return this._level;
    }

    set level(level: number){
        this._level = level;
    }

    get isAlive(): boolean {
        return this._isAlive;
    }

    set isAlive(alive: boolean){
        this._isAlive = alive;
    }
}