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
    this.armor = {
        head: ['none', 0],
        torso: ['none', 0],
        legs: ['none', 0],
        acc: ['none', 0]
    };
    this.inventory = [];
    this.xp = 0;
    this.name = name;
    this.profession = profession;
    this.id = Die.generateId();
    this.alive = true;
};

Person.prototype.die = function() {
    this.alive = false;
    this.xp = 0;
    this.profession = 'corpse';
    this.strength = 0;
    this.wounds = 0;
};

Person.prototype.checkWounds = function() {
    if (this.wounds > this.MAXIMUM_WOUNDS) {
        this.die();
        return false;
    } else {
        return true;
    };
};