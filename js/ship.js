/*
  This is the module that creates the ship, including the player and npcs.
*/

function Ship(name) {
    // global variables
    this.MAXIMUM_SPEED = 800;
    this.WEIGHT_PER_ENGINE = 5;
    this.SPEED_PER_ENGINE = 20,
    this.CREW_WEIGHT = 2;
    this.FOOD_WEIGHT = 0.2;
    this.FUEL_WEIGHT = 0.3;
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
    this.armorSize = 0;
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
    this.day = 0;
    this.distance = 0;
    this.hull = 200;
};

// getters and setters 
Ship.prototype.getName = function() {
    return this.name;
};

Ship.prototype.getCargoWeight = function() {
    return this.cargoWeight;
};

Ship.prototype.getDamage = function() {
    return this.damage;
};

Ship.prototype.init = function(food,engines,money,fuel) {
    this.food = food;
    this.engines = engines;
    this.money = money;
    this.fuel = fuel;
};

Ship.prototype.initiate = function() {
    this.init(20,3,20,10);
};

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
    var weightCapacity = this.engines * this.WEIGHT_PER_ENGINE;
    this.shipWeight = shipWeight;
    if (shipWeight <= weightCapacity) {
        return true;
    } else {
        return false;
    };
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

Ship.prototype.addCargo = function(item) {
        var weight = item[4];
        var attempt = this.attemptWeight(weight);
        if (attempt === true) {
            this.cargo.push(item);
            this.cargoWeight += weight;
        } else {
            return false;
        };
};

Ship.prototype.addCrew = function(name, profession) {
    var attempt = this.attemptWeight(this.CREW_WEIGHT);
    if (attempt === true) {
        var crew = new Person(name, profession);
        var key = crew.getName();
        this.crewList[key] = crew;
        this.crewSize++;
        this.weighShip();
    } else {
        return false;
    };
};

Ship.prototype.addWeapon = function(weapon) {
    var attempt = this.attemptWeight(weapon.weight);
    if (attempt === true) {
        var key = Die.generateId();
        var value = weapon;
        this.armory[key] = value;
        this.armorSize++;
        this.armoryWeight += weapon.weight;
        this.damage += weapon.damage;
        this.weighShip();
    } else {
        return false
    };
};