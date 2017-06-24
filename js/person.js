/*
    This is the module that creates beings, be they alien, player, or crew.
*/

function Person(name, profession) {
    // constant variables
    this.MAXIMUM_WOUNDS = 4;
    this.MAXIMUM_SPEED = 6;
    this.MAXIMUM_WEIGHT = 10;
    this.WEIGHT_PER_STRENGTH = 1;
    this.MAXIMUM_XP = 20;

    // local variables
    this.wounds = 0;
    this.speedBonus = 0;
    this.strength = 1;
    this.damage = 0;
    this.weapons = [];
    this.inventory = [];
    this.xp = 0;
    this.name = name;
    this.profession = profession;
}

Person.prototype.getName = function() {
        return this.name;
}

Person.prototype.getProfession = function() {
        return this.profession;
};