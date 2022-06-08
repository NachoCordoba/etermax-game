export default class Character {
    private _healthPoint : number;
    private _level : number;
    private _isAlive : boolean;

    constructor(){
        this._healthPoint = 10;
        this._level = 1;
        this._isAlive = true;
    }

    get healthPoint(){
        return this._healthPoint;
    }

    set healthPoint(healthPoint: number){
        this._healthPoint = healthPoint;
    }

    get level(){
        return this._level;
    }

    set level(level: number){
        this._level = level;
    }

    get isAlive(){
        return this._isAlive;
    }

    set isAlive(alive: boolean){
        this._isAlive = alive;
    }
}