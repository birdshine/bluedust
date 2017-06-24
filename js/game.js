/*
    This is the module that creates and runs the game.
*/
var Game = {
    // local variables
    player: {},

    //initiate the player
    initPlayer: function() {
        var player = Ship;
        player.initiate();
        Game.player = player;
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
});