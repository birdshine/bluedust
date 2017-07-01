/* 
  This module handles all items.
*/

function Item(name, type, category, description, value, weight) {
    this.name = name;
    this.type = type;
    this.category = category;
    this.description = description;
    this.value = value;
    this.weight = weight;
    this.id = Die.generateId();
};

// creates weapon inheriting item
Weapon.prototype = Object.create(Item.prototype);
Weapon.prototype.constructor = Weapon;

function Weapon(name, type, category, description, value, weight, damage, flavor) {
    Item.call(this, name, type, category, description, value, weight);
    this.damage = damage;
    this.flavor = flavor;
    this.broken = false;
};

// weapon methods

Weapon.prototype.break = function() {
    this.broken = true;
};

Weapon.prototype.repair = function() {
    this.broken = false;
};

/* 
  Master list of item creating functions.
*/

var ItemList = {
    // ship cargo
    margalitCrystal: function() {
        var newCargo = new Item('margalit crystal', 'cargo', 'ship', 
                                "margalit crystals, humming with power and blue light, are an \
                                uncommon crafting material.", 15, 0.001);
        return newCargo;
    },

    // ship weapons
    shipGunLaser: function() {
        var newWeapon = new Weapon('laser cannon', 'energy', 'ship', "a ship mounted laser cannon, \
                                   light in weight and power.", 30, 0.08, 1, 
                                   'laser blasts sweep the enemy hull.');
        return newWeapon;
    },
};


// test

var test = ItemList.shipGunLaser();
console.log(test);