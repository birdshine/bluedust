/*
    This is the module that creates and runs the game.
*/
var Game = {
    // local variables
    player: {},
    itemsCreated: {},
    peopleCreated: {},

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
            var key = Game.player.addCrew(name, profession);
            Game.peopleCreated[key] = 'crew';
            UI.createMessage('crew added', (name + ', ' + profession + ', has joined the ship.'), 
                             'positive', 'crew added');
            
            UI.refreshShipInfo(Game.player);
        } else {
            UI.createMessage('crew destroyed', ('you are unable to take on ' + name), 
                             'negative', 'crew destroyed');
        };
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
    UI.refreshClickListener();
});