import Faction from "../Factions/Faction";
import Character from "./Character";
import MeleFighter from "./MeleFighter";
import RangedFighter from "./RangedFighter";

class GenericCharacter extends Character {
    constructor(attackDistance = 1){
        super({ attackDistance });
    }
}

const INITIAL_HEALTHPOINT = 10;
const INITIAL_ALIVE = true;
const INITIAL_LEVEL = 1;

describe('Iteration one', ()=>{
    it('Character Creation', ()=>{
        const character = new GenericCharacter();

        expect(character.healthPoint).toEqual(INITIAL_HEALTHPOINT);
        expect(character.isAlive).toEqual(INITIAL_ALIVE);
        expect(character.level).toEqual(INITIAL_LEVEL);
    });

    it('Character Deal Damage', ()=>{
        const charDealsDamage = new GenericCharacter();
        const charReceiveDamage = new GenericCharacter();

        charDealsDamage.attack(charReceiveDamage);

        expect(charReceiveDamage.healthPoint).toEqual(5);

        charDealsDamage.attack(charReceiveDamage);
        charDealsDamage.attack(charReceiveDamage);

        expect(charReceiveDamage.healthPoint).toEqual(0);
        expect(charReceiveDamage.isAlive).toBeFalsy();
    });

    it('Character Healing', ()=>{
        const healingCharacter = new GenericCharacter();

        healingCharacter.heal(healingCharacter);

        expect(healingCharacter.healthPoint).toEqual(20);

        for(let i = 0; i < 100; i++){
            healingCharacter.heal(healingCharacter);
        }

        expect(healingCharacter.healthPoint).toBe(1000);
    });
});

describe('Iteration two', ()=>{
    it('Character can deal damage to enemies, but no to himself', ()=>{
        const charDealsDamage = new GenericCharacter();
        expect(()=> charDealsDamage.attack(charDealsDamage)).toThrow();

        const charReceiveDamage = new GenericCharacter();
        charDealsDamage.attack(charReceiveDamage);
        expect(()=> charReceiveDamage.healthPoint).not.toThrow();
    });

    it('Characters just can heal himself', ()=>{
        const healingCharacter = new GenericCharacter();
        const healedCharacter = new GenericCharacter();

        expect(()=> healingCharacter.heal(healedCharacter)).toThrow();

        expect(()=> healingCharacter.heal(healingCharacter)).not.toThrow();
    })

    it('If the target is 5 or more above levels, damage is reduced by 50%', () => {
        const charDealsDamage = new GenericCharacter();
        const charReceiveDamage = new GenericCharacter();
        charReceiveDamage.level = 6;
        charDealsDamage.attack(charReceiveDamage);
        expect(charReceiveDamage.healthPoint).toBe(7.5);
        charReceiveDamage.level = 50;
        charDealsDamage.attack(charReceiveDamage);
        expect(charReceiveDamage.healthPoint).toBe(5);
    });

    it('If the target is 5 or more below levels, damage is reduced by 50%', () => {
        const charDealsDamage = new GenericCharacter();
        const charReceiveDamage = new GenericCharacter();
        charDealsDamage.level = 6;
        charDealsDamage.attack(charReceiveDamage);
        expect(charReceiveDamage.healthPoint).toBe(2.5);
        charDealsDamage.level = 50;
        charDealsDamage.attack(charReceiveDamage);
        expect(charReceiveDamage.healthPoint).toBe(0);
        expect(charReceiveDamage.isAlive).toBeFalsy();
    });
});

describe('Iteration three', ()=>{
    it('Character has an attack range', ()=>{
        const character = new GenericCharacter(10);
        expect(character.attackDistance).toBe(10);
    });

    it('Mele Fighters have a range of 2 meters', ()=>{
        const meleFigther = new MeleFighter();
        expect(meleFigther.attackDistance).toBe(2);
    });

    it('Ranged Fighters have a range of 20 meters', ()=>{
        const rangedFighter = new RangedFighter();
        expect(rangedFighter.attackDistance).toBe(20);
    })

    it('To deal damage, the player must be in range',()=>{
        const meleFighter = new MeleFighter();
        meleFighter.level = 5;
        const rangedFighter = new RangedFighter();

        rangedFighter.positionX = 20;
        rangedFighter.positionZ = 20;

        expect(()=> meleFighter.attack(rangedFighter)).toThrow();
        expect(()=> rangedFighter.attack(meleFighter)).toThrow();

        rangedFighter.positionX = 10;
        rangedFighter.positionZ = 15;
        expect(()=> meleFighter.attack(rangedFighter)).toThrow();
        expect(()=> rangedFighter.attack(meleFighter)).not.toThrow();
        expect(meleFighter.healthPoint).toBe(5);

        meleFighter.level = 6;
        meleFighter.positionX = 9;
        meleFighter.positionZ = 13;

        expect(()=> meleFighter.attack(rangedFighter)).toThrow();
        expect(()=> rangedFighter.attack(meleFighter)).not.toThrow();
        expect(meleFighter.healthPoint).toBe(2.5);

        meleFighter.positionX = 10;
        meleFighter.positionZ = 14;
        expect(()=> meleFighter.attack(rangedFighter)).not.toThrow();
        expect(()=> meleFighter.attack(rangedFighter)).not.toThrow();

        expect(rangedFighter.healthPoint).toBe(0);
        expect(rangedFighter.isAlive).toBeFalsy();
    });
});

describe('Iteration four', ()=>{
    it('Characters may belong to one or more factions. Newly created characters belong to no faction', ()=>{
        const character = new GenericCharacter();
        expect(character.factions.length).toBe(0);        
    });

    it('A character may join or leave one or more factions', ()=>{
        const character = new GenericCharacter();
        const factionOne = new Faction({ id: 1, name: 'Faction One' });
        const factionTwo = new Faction({ id: 2, name: 'Faction Two' });

        character.joinFaction(factionOne);
        expect(character.factions).toEqual([factionOne]);

        character.joinFaction(factionTwo);
        expect(character.factions).toEqual([factionOne, factionTwo]);

        character.leaveFaction(factionOne.id);
        expect(character.factions).toEqual([factionTwo]);
        character.leaveFaction(factionTwo.id);
        expect(character.factions).toEqual([]);
    })
});