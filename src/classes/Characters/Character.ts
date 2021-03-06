import { INITIAL_ALIVE, INITIAL_DAMAGEPOINT, INITIAL_HEALINGPOINT, INITIAL_HEALTHPOINT, INITIAL_LEVEL, INITIAL_POSITION_X, INITIAL_POSITION_Z, MAX_HEALTHPOINT } from "../../config/constants";
import Faction from "../Factions/Faction";
export default abstract class Character {
    private _healthPoint: number;
    private _level: number;
    private _isAlive: boolean;
    private _damagePoint: number;
    private _healingPoint: number;
    private _attackDistance: number;
    private _factions: Array<Faction>

    private _positionX: number;
    private _positionZ: number;

    constructor({ attackDistance }: { attackDistance : number }){
        this._healthPoint = INITIAL_HEALTHPOINT;
        this._level = INITIAL_LEVEL;
        this._isAlive = INITIAL_ALIVE;
        this._damagePoint = INITIAL_DAMAGEPOINT;
        this._healingPoint = INITIAL_HEALINGPOINT;
        this._attackDistance = attackDistance;

        this._positionX = INITIAL_POSITION_X;
        this._positionZ = INITIAL_POSITION_Z;
        this._factions = new Array<Faction>();
    }

    private calculateDistance = (fromCharacter: Character): number => {
        const hickA = this.positionZ - fromCharacter.positionZ;
        const hickB = this.positionX - fromCharacter.positionX;
        const hypotenuse = Math.sqrt((Math.pow(hickA, 2) + Math.pow(hickB, 2)));
        return hypotenuse;
    }

    private isFromSameFaction = (fromCharacter: Character): boolean => {
        if(fromCharacter === this) return true;
        return this.factions.filter( faction => fromCharacter.factions.indexOf(faction) != -1).length > 0;
    }

    public attack = (characterReceiveDamage: Character): void => {
        if(characterReceiveDamage === this) throw new Error(`Can't deal damage yourself`);
        if(this.isFromSameFaction(characterReceiveDamage)) throw new Error(`U're from the same faction`);
        if(this.calculateDistance(characterReceiveDamage) > this.attackDistance) throw new Error(`Target out of range`);

        let damage = this.damagePoint;
        const levelDif = this.level - characterReceiveDamage.level;

        if(levelDif <= -5) damage = damage * 0.5;
        if(levelDif >= 5) damage = damage * 1.5;
        
        characterReceiveDamage.receiveDamage(damage);
    }

    public receiveDamage = (damage: number): void => {
        this.healthPoint = this.healthPoint - damage;
    }

    public heal = (characterReceiveHeal: Character) => {
        if(!this.isFromSameFaction(characterReceiveHeal)) throw new Error(`Just can heal yourself and your faction alliades`);
        characterReceiveHeal.receiveHeal(this.healingPoint);
    }

    public receiveHeal = (heal: number): void => {
        if(heal + this.healthPoint > MAX_HEALTHPOINT) heal = MAX_HEALTHPOINT - this.healthPoint;
        this.healthPoint = this.healthPoint + heal;
    }

    public joinFaction = (faction: Faction): void => {
        this.factions.push(faction);
    }

    public leaveFaction = (id: number): void => {
        this.factions = this.factions.filter(faction => faction.id !== id);
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

    get attackDistance(): number {
        return this._attackDistance;
    }

    set attackDistance(attackDistance: number){
        this._attackDistance = attackDistance;
    }

    get positionX(): number {
        return this._positionX;
    }

    set positionX(positionX: number){
        this._positionX = positionX;
    }

    get positionZ(): number {
        return this._positionZ;
    }

    set positionZ(positionZ: number){
        this._positionZ = positionZ;
    }

    get factions(): Array<Faction> {
        return this._factions;
    }

    set factions(factions: Array<Faction>){
        this._factions = factions;
    }
}