import { INITIAL_ALIVE, INITIAL_DAMAGEPOINT, INITIAL_HEALINGPOINT, INITIAL_HEALTHPOINT, INITIAL_LEVEL, MAX_HEALTHPOINT } from "../config/constants";
export default class Character {
    private _healthPoint: number;
    private _level: number;
    private _isAlive: boolean;
    private _damagePoint: number;
    private _healingPoint: number;

    constructor(){
        this._healthPoint = INITIAL_HEALTHPOINT;
        this._level = INITIAL_LEVEL;
        this._isAlive = INITIAL_ALIVE;
        this._damagePoint = INITIAL_DAMAGEPOINT;
        this._healingPoint = INITIAL_HEALINGPOINT;
    }

    public attack = (characterReceiveDamage: Character): void => {
        characterReceiveDamage.receiveDamage(this.damagePoint);
    }

    public receiveDamage = (damage: number): void => {
        this.healthPoint = this.healthPoint - damage;
    }

    public heal = (characterReceiveHeal: Character) => {
        characterReceiveHeal.receiveHeal(this.healingPoint);
    }

    public receiveHeal = (heal: number): void => {
        if(heal + this.healthPoint > MAX_HEALTHPOINT) heal = MAX_HEALTHPOINT - this.healthPoint;
        this.healthPoint = this.healthPoint + heal;
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

    get damagePoint(): number {
        return this._damagePoint;
    }

    set damagePoint(damage: number){
        this._damagePoint = damage;
    }

    get healingPoint(): number {
        return this._healingPoint;
    }

    set healingPoint(heal: number){
        this._healingPoint = heal;
    }
}