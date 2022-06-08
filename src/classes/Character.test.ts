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

        healingCharacter.heal(healingCharacter);

        expect(healingCharacter.healthPoint).toEqual(20);

        for(let i = 0; i < 100; i++){
            healingCharacter.heal(healingCharacter);
        }

        expect(healingCharacter.healthPoint).toBe(1000);
    });
});

describe('Iteration 2', ()=>{
    it('Character can deal damage to enemies, but no to himself', ()=>{
        const charDealsDamage = new Character();
        expect(()=> charDealsDamage.attack(charDealsDamage)).toThrow();

        const charReceiveDamage = new Character();
        charDealsDamage.attack(charReceiveDamage);
        expect(()=> charReceiveDamage.healthPoint).not.toThrow();
    });

    it('Characters just can heal himself', ()=>{
        const healingCharacter = new Character();
        const healedCharacter = new Character();

        expect(()=> healingCharacter.heal(healedCharacter)).toThrow();

        expect(()=> healingCharacter.heal(healingCharacter)).not.toThrow();
    })

    it('If the target is 5 or more above levels, damage is reduced by 50%', () => {
        const charDealsDamage = new Character();
        const charReceiveDamage = new Character();
        charReceiveDamage.level = 6;
        charDealsDamage.attack(charReceiveDamage);
        expect(charReceiveDamage.healthPoint).toBe(7.5);
        charReceiveDamage.level = 50;
        charDealsDamage.attack(charReceiveDamage);
        expect(charReceiveDamage.healthPoint).toBe(5);
    })
})