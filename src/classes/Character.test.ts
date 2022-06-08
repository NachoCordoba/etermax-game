import Character from "./Character";

describe('Iteration one', ()=>{
    it('Character Creation', ()=>{
        const character = new Character();

        expect(character.healthPoint).toEqual(10);
        expect(character.isAlive).toBeTruthy();
        expect(character.level).toEqual(1);
    });
})