/* 
  This module handles all items.
*/

function Item(name, type, category, description, value) {
    this.name = name;
    this.type = type;
    this.category = category;
    this.description = description;
    this.value = value;
};

// creates weapon inheriting item
Weapon.prototype = Object.create(Item.prototype);
Weapon.prototype.constructor = Weapon;

function Weapon(name, type, category, description, value, damage, flavor) {
    Item.call(this, name, type, category, description, value);
    this.damage = damage;
    this.flavor = flavor;
};

/* 
  Master list of item creating functions.
*/

var ItemList = {
    // ship weapons
    shipGunLaser: function() {
        var newWeapon = new Weapon('mounted laser gun', 'energy', 'ship', 'a laser cannon mountable to the hull', 
                               30, 1, 'laser blasts sweep the enemy hull');
        return newWeapon;
    },
};


// test

var test = ItemList.shipGunLaser();
console.log(test);