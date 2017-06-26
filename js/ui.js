
/*
    This module creates the UI
*/

var UI = {
    // local variables
    userTerminalText: '',
    log: [],
    inbox: [],
    totalMessages: 0,

    // refresh clickers
    refreshClickListener: function() {
         // turn off button listeners
        $('#wrapper .close-message').off();
        $('#wrapper #user-log').off();
        $('#wrapper #log-close').off();
        $('#wrapper #user-terminal-text').off();
        $('#wrapper .crew').off();
        $('#wrapper .weight').off();

        /* turn on buttons
           key stroke in player text terminal */
        $('#wrapper #user-terminal-text').on('keydown', function(event) {
            var length = $('#user-terminal-text').val().length;

            // player presses enter, take text from terminal
            if (event.which === 13) {
                event.preventDefault();
                UI.log.push([$('#user-terminal-text').val(),'input']);
                UI.userTerminalText = $('#user-terminal-text').val().slice(15);
                $echo = "<p>>> " + UI.userTerminalText + "</p>";
                UI.echo($echo);
            // don't let player backspace passed terminal value    
            } else if (event.which === 8 && length <= 15) {
                event.preventDefault();
            // retrieve last terminal text entry when player presses up key
            } else if (event.which === 38) {
                event.preventDefault();
                $echo = UI.userTerminalText;
                UI.reverseEcho($echo);
            };
        });

        // close message with unique message and button ids
        $('#wrapper .close-message').on('click', function() {
            var messageId = 'msg' + $(this).attr('id').slice(3);
            var targetId = '#' + messageId;
            $(targetId).remove();
            UI.inboxDelete(messageId);
        });

        // display log
        $('#wrapper #user-log').on('click', function() {
            $('#log').remove();
            UI.logRead();
        });

        // close log
        $('#wrapper #log-close').on('click', function() {
             $('#log').remove();
        });
        
        // display crew
        $('#wrapper .crew').on('mouseenter', function() {
            if (Game.player.crewSize > 0) {
                $divCrew = "<figure class='col-sm-12 ship-menu-hover-crew' id='crew-manifest'>\
                           <div class='row' id='crew-manifest-row'></div></figure>";
                $('#ship-menu-hover').append($divCrew);
                for (attr in Game.player.crewList) {
                    $divCrewMember = "<figure class='col-sm-2 crew-member-entry'><p>" 
                                     + Game.player.crewList[attr].getName() + "</p><p>" 
                                     + Game.player.crewList[attr].getProfession() + "</p><p>"
                                     + Game.player.crewList[attr].getXP() + " xp</p></figure>";
                    $('#crew-manifest-row').append($divCrewMember); 
                };
            };
        });

        $('#wrapper .crew').on('mouseleave', function() {
            $('#ship-menu-hover').empty();
        });

        // display weight
        $('#wrapper .weight').on('mouseenter', function() {
            $divWeight = "<figure class='col-sm-12 ship-menu-hover-weight'><div class='row' id='weight-display'>\
                         </div></figure>";
                $('#ship-menu-hover').append($divWeight);
                var crewWeight = Game.player.crewWeight;
                var foodWeight = Game.player.foodWeight;
                var fuelWeight = Game.player.fuelWeight;
                var armoryWeight = Game.player.armoryWeight;
                var cargoWeight = Game.player.cargoWeight;
                var droneWeight = Game.player.droneWeight;
                var totalWeight = Game.player.shipWeight;
                var weightCapacity = Game.player.engines * Game.player.WEIGHT_PER_ENGINE;
                $divCrewWeight = "<figure class='col-sm-2 weight-entry'>crew: \
                                 " + crewWeight + "</figure>";
                $divFoodWeight = "<figure class='col-sm-2 weight-entry'>food: \
                                 " + foodWeight + "</figure>";
                $divFuelWeight = "<figure class='col-sm-2 weight-entry'>fuel: \
                                 " + fuelWeight + "</figure>";
                $divArmoryWeight = "<figure class='col-sm-2 weight-entry'>weapons: \
                                 " + armoryWeight + "</figure>";
                $divCargoWeight = "<figure class='col-sm-2 weight-entry'>cargo: \
                                  " + cargoWeight + "</figure>";
                $divDroneWeight = "<figure class='col-sm-2 weight-entry'>drones: \
                                  " + droneWeight + "</figure></div>";
                $divTotalWeight = "<figure class='col-sm-2 weight-entry'>total: \
                                  " + totalWeight + "</figure>";
                $divCapacity = "<figure class='col-sm-2 weight-entry'>capacity: \
                                  " + weightCapacity + "</figure>";
                $('#weight-display').append($divCrewWeight);
                $('#weight-display').append($divFoodWeight);
                $('#weight-display').append($divFuelWeight);
                $('#weight-display').append($divArmoryWeight);
                $('#weight-display').append($divCargoWeight);
                $('#weight-display').append($divDroneWeight);
                $('#weight-display').append($divTotalWeight);
                $('#weight-display').append($divCapacity);
        });

        $('#wrapper .weight').on('mouseleave', function() {
            $('#ship-menu-hover').empty();
        });
    },

    // work with terminal text
    echo: function(echo) {
        $('#user-terminal-text').val('dnl@olivaw: >> ');
        $('#terminal-echo').empty();
        $('#terminal-echo').append(echo);
        UI.refreshClickListener();
    },

    reverseEcho: function(echo) {
        $('#user-terminal-text').val('');
        $('#user-terminal-text').val('dnl@olivaw: >> ' + echo);
        UI.refreshClickListener();
    },

    // create and manage inbox
    inboxDelete: function(message) {
        for (i in UI.inbox) {
            if (UI.inbox[i] === message) {
                UI.inbox.splice(i,1);
            };
        };
    },

    // display log entries to player
    logRead: function() {
        // create log display in .screen
        var $divLog = "<div class='row' id='log'><div class='col-sm-2' id='log-title'><h4>log</h4></div>\
        <div class='col-sm-6'><ul id='log-ul'></ul></div>\
        <div class='col-sm-2'><div id='log-close'><h4>close</h4></div></div>";
        $('.screen').prepend($divLog);

        // append every log entry
        for(i=0;i < UI.log.length;i++) {
            var $logEntry = "<li>" + UI.log[i][0] + " - " + UI.log[i][1] + "</li>";
            $('#log-ul').prepend($logEntry);
        };

        UI.refreshClickListener();
    },

    // this function creates a message and adds it to inbox
    createMessage: function(title,message,type,log) {
        // create message content
        UI.totalMessages++;
        var messageID = 'msg' + UI.totalMessages;
        var buttonID = 'btn' + UI.totalMessages;
        var $divMessageTitle = "<div class='message-title'>" + title + "</div>";
        var $divCloseMessage = "<div class='btn btn-secondary close-message' role='button' id=" + buttonID +"></div>";
        var $divMessageHeader = "<div class='message-header'>" + $divMessageTitle + $divCloseMessage + "</div>";
        var $divMessageContent = "<div class='message-content'>" + message + "</div>";
        var $divMessagePositive = "<div class='message-positive message' id=" + messageID + ">\
        " + $divMessageHeader + $divMessageContent + "</div>";
        var $divMessageNegative = "<div class='message-negative message' id=" + messageID + ">\
        " + $divMessageHeader + $divMessageContent + "</div>";

        // create message based on type
        switch(type) {
            case 'positive':
                $('.screen').prepend($divMessagePositive);
                UI.inbox.push(messageID);
                UI.log.push([log,type]);
                break;
            case 'negative':
                $('.screen').prepend($divMessageNegative);
                UI.inbox.push(messageID);
                UI.log.push([log,type]);
                break;
        };
        
        UI.refreshClickListener();
    },

    // create the ship ui 
    shipInit: function(ship) {
        // create messages for the user letting them know the ship is online and they are low on fuel
        UI.createMessage('online', 'SHIP functions fully restored. This vessel is online and operational.', 
                         'positive', 'ship rebooted');
        UI.createMessage('warning', 'WARNING: Low fuel. Refuel before attempting launch.',
                         'negative', 'low fuel warning');

        // create ship ui and append it to the footer
        $divShipInfo = "<div class='row ship-info'>\
                       <figure class='col-sm-1 ship-menu' id='ship-day-title'>day</figure>\
                       <figure class='col-sm-1 ship-menu' id='ship-day'></figure>\
                       <figure class='col-sm-1 ship-menu' id='ship-distance-title'>distance</figure>\
                       <figure class='col-sm-1 ship-menu' id='ship-distance'></figure>\
                       <figure class='col-sm-1 ship-menu crew' id='ship-crew-title'>crew</figure>\
                       <figure class='col-sm-1 ship-menu crew' id='ship-crew'></figure>\
                       <figure class='col-sm-1 ship-menu' id='ship-food-title'>food</figure>\
                       <figure class='col-sm-1 ship-menu' id='ship-food'></figure>\
                       <figure class='col-sm-1 ship-menu' id='ship-engines-title'>engines</figure>\
                       <figure class='col-sm-1 ship-menu' id='ship-engines'></figure>\
                       <figure class='col-sm-1 ship-menu' id='ship-hull-title'>hull</figure>\
                       <figure class='col-sm-1 ship-menu' id='ship-hull'></figure>\
                       <figure class='col-sm-1 ship-menu' id='ship-damage-title'>damage</figure>\
                       <figure class='col-sm-1 ship-menu' id='ship-damage'></figure>\
                       <figure class='col-sm-1 ship-menu' id='ship-money-title'>money</figure>\
                       <figure class='col-sm-1 ship-menu' id='ship-money'></figure>\
                       <figure class='col-sm-1 ship-menu' id='ship-fuel-title'>fuel</figure>\
                       <figure class='col-sm-1 ship-menu' id='ship-fuel'></figure>\
                       <figure class='col-sm-1 ship-menu weight' id='ship-weight-title'>weight</figure>\
                       <figure class='col-sm-1 ship-menu weight' id='ship-weight'></figure></div>\
                       <div class='row ship-info' id='ship-menu'>\
                       <figure class='col ship-menu-button'>status</figure>\
                       <figure class='col ship-menu-button'>cargo</figure>\
                       <figure class='col ship-menu-button'>weapons</figure>\
                       <figure class='col ship-menu-button'>drones</figure>\
                       <figure class='col ship-menu-button'>colonies</figure></div>\
                       <div class='row' id='ship-menu-hover'></div>"
        $('#footer').append($divShipInfo);

        // fill ship stats with player ship info
        UI.refreshShipInfo(ship);
    },

    refreshShipInfo: function(ship) {
        // refresh ship info display
        $('#ship-distance').empty();
        $('#ship-distance').append(ship.distance);
        $('#ship-crew').empty();
        $('#ship-crew').append(ship.crewSize);
        $('#ship-food').empty();
        $('#ship-food').append(ship.food);
        $('#ship-engines').empty();
        $('#ship-engines').append(ship.engines);
        $('#ship-hull').empty();
        $('#ship-hull').append(ship.hull);
        $('#ship-damage').empty();
        $('#ship-damage').append(ship.damage);
        $('#ship-money').empty();
        $('#ship-money').append(ship.money);
        $('#ship-fuel').empty();
        $('#ship-fuel').append(ship.fuel);
        $('#ship-weight').empty();
        $('#ship-weight').append(ship.shipWeightDisplay);
        $('#ship-day').empty();
        $('#ship-day').append(ship.day);

        UI.refreshClickListener();
    },
    
};