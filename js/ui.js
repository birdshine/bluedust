
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
            $divCrew = "<figure class='col-sm-12 ship-menu-hover'></figure>";
            $('#ship-menu-hover').append($divCrew);
        });

        $('#wrapper .crew').on('mouseleave', function() {
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
        UI.createMessage('online', 'SHIP functions fully restoryed. This vessel is online and operational.', 
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
                       <figure class='col-sm-1 ship-menu' id='ship-fuel'></figure></div>\
                       <div class='row ship-info' id='ship-menu'>\
                       <figure class='col ship-menu-button'>status</figure>\
                       <figure class='col ship-menu-button'>cargo</figure>\
                       <figure class='col ship-menu-button'>weapons</figure>\
                       <figure class='col ship-menu-button'>drones</figure>\
                       <figure class='col ship-menu-button'>colonies</figure></div>\
                       <div class='row' id='ship-menu-hover'></div>"
        $('#footer').append($divShipInfo);

        // fill ship stats with player ship info
        $('#ship-day').append(ship.day);
        $('#ship-distance').append(ship.distance);
        $('#ship-crew').append(ship.crew);
        $('#ship-food').append(ship.food);
        $('#ship-engines').append(ship.engines);
        $('#ship-hull').append(ship.hull);
        $('#ship-damage').append(ship.damage);
        $('#ship-money').append(ship.money);
        $('#ship-fuel').append(ship.fuel);

        UI.refreshClickListener();
    }
};