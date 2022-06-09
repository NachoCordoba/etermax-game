import { INITIAL_MELE_FIGHTER_RANGE } from "../../config/constants";
import Character from "./Character"

export default class MeleFighter extends Character{
    constructor(){
        super({ attackDistance: INITIAL_MELE_FIGHTER_RANGE});
    }
}