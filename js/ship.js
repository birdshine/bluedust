/*
  This is the module that creates the ship, including the player and npcs.
*/

function Ship(name) {
    // global variables
    this.MAXIMUM_SPEED = 800;
    this.WEIGHT_PER_ENGINE = 5;
    this.SPEED_PER_ENGINE = 20,
    this.CREW_WEIGHT = 0;
    this.DRONE_WEIGHT = 0.33;
    this.LOOT_WEIGHT = 0.5;
    this.GUNS_WEIGHT = 0.8;
    this.FOOD_WEIGHT = 0.2;
    this.FUEL_WEIGHT = 0.3;
    this.CREW_HUNGER = 0.2;
    this.DAY_PER_DISTANCE = 0.33;
    this.FUEL_PER_DAY = 1;
    this.EVENT_PROBABILITY = 0.15;

    // local variables
    this.name = name;
    this.cargo = [];
    this.cargoWeight = 0;
    this.armory = [];
    this.damage = 0;
    this.shipWeight = 0;
    this.crewList = {};
    this.crewSize = 0;
};

Ship.prototype.init = function(distance,food,engines,cargo,money,guns,fuel,loot) {
    this.day = 0;
    this.hull = 200;
    this.distance = distance;
    this.food = food;
    this.engines = engines;
    this.cargoCapacity = cargo;
    this.money = money;
    this.guns = guns;
    this.damage =  3 * guns;
    this.fuel = fuel;
    this.loot = loot;
};

Ship.prototype.initiate = function() {
    this.init(0,20,3,0,0,1,10,0);
    this.addCrew('eve', 'first woman');
    this.addCrew('adam', 'first man');
    this.addCrew('lilith', 'first noncompliant');
    for (attr in this.crewList) {
        alert(attr);
        alert(this.crewList[attr]);
    };
};

Ship.prototype.weighShip = function(ship) {
    var crew = this.crewSize * Ship.CREW_WEIGHT;
    var food = this.food * Ship.FOOD_WEIGHT;
    var guns = this.guns * Ship.GUNS_WEIGHT;
    var fuel = this.fuel * Ship.FUEL_WEIGHT;
    var loot = this.loot * Ship.LOOT_WEIGHT;
    var shipWeight = crew + food + guns + fuel + loot;
    var weightCapacity = this.engines * Ship.WEIGHT_PER_ENGINE;
    this.shipWeight = shipWeight;
    alert('ship weight: ' + this.shipWeight + 'ship capacity: ' + weightCapacity);
    if (shipWeight <= weightCapacity) {
        return true;
    } else {
        return false;
    };
};

Ship.prototype.attemptWeight = function(weight) {
    this.weighShip();
    attempt = this.shipWeight + weight;
    alert('attempt weight: ' + attempt);
    capacity = this.engines * Ship.WEIGHT_PER_ENGINE;
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
            this.shipWeight += weight;
        } else {
            return false;
        };
};

Ship.prototype.addCrew = function(name, profession) {
    var attempt = this.attemptWeight(this.CREW_WEIGHT);
    if (attempt === true) {
        var crew = new Person(name, profession);
        alert(crew);
        var key = this.crewSize;
        this.crewList[key] = crew;
        this.crewSize++;
    } else {
        alert('cannot take crew member');
        return false;
    };
};