/*
    This is the module that creates and runs the game.
*/
var Game = {
    // local variables
    player: {},
    itemsCreated: {},
    peopleCreated: {},
    crewCreated: {},

    //initiate the player
    initPlayer: function() {
        var player = new Ship('player');
        player.initiate();
        Game.player = player;
    },

    // give player things ie items, crew
    attemptAddCrew: function(name, profession) {
        var attempt = Game.player.checkCrewCapacity();
        if (attempt === true) {
            var crew = Game.player.addCrew(name, profession);
            var key = crew.name;
            Game.crewCreated[key] = crew;
            UI.createMessage('crew added', (name + ', ' + profession + ', has joined the ship.'), 
                             'positive', 'crew added');
            
            UI.refreshShipInfo(Game.player);
        } else {
            UI.createMessage('crew destroyed', ('you are unable to take on ' + name), 
                             'negative', 'crew destroyed');
        };
    },

    removePlayerCrew: function(name) {
        Game.player.removeCrew(name);
        UI.createMessage('crew member lost', (name + ' has left the ship.'), 'negative', 
                         (name + ' left the ship'));
        
        UI.refreshShipInfo(Game.player);
    },

    killPlayerCrew: function(name) {
        Game.player.removeCrew(name);
        Game.crewCreated[name].die();
        UI.createMessage('crew member dead', (name + ' has died.'), 'negative', (name + ' died'));

        UI.refreshShipInfo(Game.player);
    },

    attemptAddShipWeapon: function(weapon) {
        var attempt = Game.player.attemptWeight(weapon.weight);
        if (attempt === true) {
            var key = Game.player.addWeapon(weapon);
            Game.itemsCreated[key] = 'shipWeapon';
            UI.createMessage('weapon installed', (weapon.name + " succesfully added to SHIP armory, increasing \
                              damage output by " + weapon.damage + "."), 'positive', (weapon.name + ' added to armory.'));
            
            UI.refreshShipInfo(Game.player);
        } else {
            UI.createMessage('weapon destroyed', (weapon.name + ' was too heavy and has been destroyed.'), 
                             'negative', 'weapon destroyed');
        };
    },

    attemptAddCargo: function(cargo) {
        var attempt = Game.player.attemptWeight(cargo.weight);
        if (attempt === true) {
            var key = Game.player.addCargo(cargo);
            Game.itemsCreated[key] = 'cargo';
            UI.createMessage('cargo added', (cargo.name + " has been added to the ship's cargo holds."),
                            'positive', (cargo.name + " added to cargo"));

            UI.refreshShipInfo(Game.player);
        } else {
            UI.createMessage('cargo destroyed', (cargo.name + " was too heavy and has been destroyed."),
                              'negative', 'cargo destroyed');
        };
    },

    attemptAddFuel: function(number) {
        var weight = number * Game.player.FUEL_WEIGHT;
        var attempt = Game.player.attemptWeight(weight);
        if (attempt === true) {
            Game.player.addFuel(number);
            UI.createMessage('refueled', (number + ' fuel added.'), 'positive', 'refueled (' + number + ')');

            UI.refreshShipInfo(Game.player);
        } else {
            while (attempt === false) {
                number = number * 0.5;
                weight = number * Game.player.FUEL_WEIGHT;
                attempt = Game.player.attemptWeight(weight);
                if (number < 1) {
                    number = 0;
                };
            };
            Game.player.addFuel(number);
            UI.createMessage('refueled', ('siphoned ' + number + ' fuel.'), 'positive', 'refueled (' + number + ')');

            UI.refreshShipInfo(Game.player);
        };
    }
};

/*
    Launch game when the DOM is loaded.
*/
$(document).ready(function() {
    // turn on butttons and keypress listeners
    UI.refreshClickListener();

    // initiate player ship
    Game.initPlayer();

    // initiate ship UI
    UI.shipInit(Game.player);
    var firstWeapon = ItemList.shipGunLaser();
    Game.attemptAddShipWeapon(firstWeapon)
    Game.attemptAddCrew('julian', 'evil soap opera character');
    Game.killPlayerCrew('julian');
    Game.player.removeWeapon(firstWeapon.id);
    UI.refreshShipInfo(Game.player);
    UI.refreshClickListener();
});