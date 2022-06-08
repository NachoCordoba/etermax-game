import Character from "./Character";

const INITIAL_HEALTHPOINT = 10;
const INITIAL_ALIVE = true;
const INITIAL_LEVEL = 1;

describe('Iteration one', ()=>{
    it('Character Creation', ()=>{
        const character = new Character();

        expect(character.healthPoint).toEqual(INITIAL_HEALTHPOINT);
        expect(character.isAlive).toEqual(INITIAL_ALIVE);
        expect(character.level).toEqual(INITIAL_LEVEL);
    });

    it('Character Deal Damage', ()=>{
        const charDealsDamage = new Character();
        const charReceiveDamage = new Character();

        charDealsDamage.attack(charReceiveDamage);

        expect(charReceiveDamage.healthPoint).toEqual(5);

        charDealsDamage.attack(charReceiveDamage);
        charDealsDamage.attack(charReceiveDamage);

        expect(charReceiveDamage.healthPoint).toEqual(0);
        expect(charReceiveDamage.isAlive).toBeFalsy();
    });

    it('Character Healing', ()=>{
        const healingCharacter = new Character();
        const healedCharacter = new Character();

        healingCharacter.heal(healedCharacter);

        expect(healedCharacter.healthPoint).toEqual(20);

        for(let i = 0; i < 100; i++){
            healingCharacter.heal(healedCharacter);
        }

        expect(healedCharacter.healthPoint).toBe(1000);
    });
})