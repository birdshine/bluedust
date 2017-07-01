/*
  This is the module that creates the ship, including the player and npcs.
*/

function Ship(name) {
    // global variables
    this.MAXIMUM_SPEED = 800;
    this.MAXIMUM_CREW = 6;
    this.WEIGHT_PER_ENGINE = 5;
    this.SPEED_PER_ENGINE = 20,
    this.CREW_WEIGHT = 2;
    this.FOOD_WEIGHT = 0.02;
    this.FUEL_WEIGHT = 0.09;
    this.CREW_HUNGER = 0.2;
    this.DAY_PER_DISTANCE = 0.33;
    this.FUEL_PER_DAY = 1;
    this.EVENT_PROBABILITY = 0.15;

    // local variables
    this.name = name;
    this.cargoList = {};
    this.cargoSize = 0;
    this.cargoWeight = 0;
    this.armory = {};
    this.armorySize = 0;
    this.armoryWeight = 0;
    this.damage = 0;

    this.crewList = {};
    this.crewSize = 0;
    this.crewWeight = 0;
    this.foodWeight = 0;
    this.droneList = {};
    this.droneSize = 0;
    this.droneWeight = 0;
    this.fuelWeight = 0;
    this.shipWeight = 0;
    this.shipWeightDisplay = 0;
    this.day = 0;
    this.distance = 0;
    this.hull = 200;
};

// all ship functions
// initiate ship
Ship.prototype.init = function(food,engines,money,fuel) {
    this.food = food;
    this.engines = engines;
    this.money = money;
    this.fuel = fuel;
};

// initiate player ship
Ship.prototype.initiate = function() {
    this.init(20,3,20,10);
};

// methods to appraise ship and set its stats
Ship.prototype.weighShip = function() {
    var crew = this.crewSize * this.CREW_WEIGHT;
    this.crewWeight = crew;
    var food = this.food * this.FOOD_WEIGHT;
    this.foodWeight = food;
    var fuel = this.fuel * this.FUEL_WEIGHT;
    this.fuelWeight = fuel;
    var armory = this.armoryWeight;
    var cargo = this.cargoWeight;
    var drones = this.droneWeight;
    var shipWeight = crew + food + fuel + armory + cargo + drones;
    if (shipWeight < 0) {
        shipWeight = 0;
    };
    var weightCapacity = this.engines * this.WEIGHT_PER_ENGINE;
    this.shipWeight = shipWeight;
    this.shipWeightDisplay = Math.round(shipWeight);
};

Ship.prototype.calculateDamage = function() {
    var damage = 0;
    for (attr in this.armory) {
        if (this.armory[attr].broken === false) {
            damage += this.armory[attr].damage;
        };
    };
    this.damage = damage;
};

Ship.prototype.attemptWeight = function(weight) { 
    this.weighShip(); 
    attempt = this.shipWeight + weight;
    capacity = this.engines * this.WEIGHT_PER_ENGINE;
    if (attempt <= capacity) { 
        return true; 
    } else { 
        return false;
    };
};

Ship.prototype.checkCrewCapacity = function() {
    if (this.crewSize < this.MAXIMUM_CREW) {
        var attempt = this.attemptWeight(this.CREW_WEIGHT);
        if (attempt === true) {
            return true;
        } else {
            return false;
        };
    } else {
        return false;
    };
};

// methods to manipulate the ship
Ship.prototype.addCargo = function(item) {
    var key = item.id;
    var value = item
    this.cargoList[key] = value;
    this.cargoSize++;
    this.cargoWeight += item.weight;
    this.weighShip();
    return key;
};

Ship.prototype.removeCargo = function(key) {
    for (attr in this.cargoList) {
        if (attr === key) {
            this.cargoWeight -= this.cargoList[attr].weight;
            delete this.cargoList[attr];
            this.cargoSize--;
            this.weighShip();
        };
    };
};

Ship.prototype.addCrew = function(name, profession) {
    var crew = new Person(name, profession);
    var key = crew.name;
    this.crewList[key] = crew;
    this.crewSize++;
    this.weighShip();
    return crew;
};

Ship.prototype.removeCrew = function(name) {
    delete this.crewList[name];
    this.crewSize--;
    this.weighShip();
};

Ship.prototype.addWeapon = function(weapon) {
    var key = weapon.id
    var value = weapon;
    this.armory[key] = value;
    this.armorySize++;
    this.armoryWeight += weapon.weight;
    this.calculateDamage();
    this.weighShip();
    return key;
};

Ship.prototype.removeWeapon = function(key) {
    this.armoryWeight -= this.armory[key].weight;
    delete this.armory[key];
    this.armorySize--;
    this.weighShip();
};

Ship.prototype.addFuel = function(number) {
    this.fuel += number;
    this.weighShip();
};

Ship.prototype.removeFuel = function(number) {
    this.fuel -= number;
    this.weighShip();
};