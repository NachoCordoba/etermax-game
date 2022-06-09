import { INITIAL_RANGED_FIGHTER_RANGE } from "../../config/constants";
import Character from "./Character";

export default class RangedFighter extends Character{
    constructor(){
        super({ attackDistance: INITIAL_RANGED_FIGHTER_RANGE });
    }
}