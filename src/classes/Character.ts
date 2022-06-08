import { INITIAL_ALIVE, INITIAL_DAMAGE, INITIAL_HEALTHPOINT, INITIAL_LEVEL } from "../config/constants";
export default class Character {
    private _healthPoint: number;
    private _level: number;
    private _isAlive: boolean;
    private _damage: number;

    constructor(){
        this._healthPoint = INITIAL_HEALTHPOINT;
        this._level = INITIAL_LEVEL;
        this._isAlive = INITIAL_ALIVE;
        this._damage = INITIAL_DAMAGE;
    }

    public attack = (characterReceiveDamage: Character): void => {
        characterReceiveDamage.receiveDamage(this.damage);
    }

    public receiveDamage = (damage: number): void => {
        this.healthPoint = this.healthPoint - damage;
    }

    get healthPoint(): number {
        return this._healthPoint;
    }

    set healthPoint(healthPoint: number){
        if(healthPoint <= 0){
            healthPoint = 0;
            this.isAlive = false;
        }

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

    get damage(): number {
        return this._damage;
    }

    set damage(damage: number){
        this._damage = damage;
    }
}