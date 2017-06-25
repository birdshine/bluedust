/*
  This module handles dice rolling and random number generation.
*/

var Die = {
    randomDesignatedRange: function(min, max) {
        roll = Math.random() * (max - min) + min;
        return Math.round(roll);
    },

    rollPercentile: function() {
        return Die.randomDesignatedRange(1,100);
    },

    rollDamage: function(damage) {
        return Die.randomDesignatedRange(1,damage);
    },

    rollAlphabet: function() {
        var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o',
                        'p','q','r','s','t','u','v','w','x','y','z','&']
        var roll = Die.randomDesignatedRange(0,26);
        return alphabet[roll];
    },
    
    rollLetterorInteger: function() {
        var roll = Die.randomDesignatedRange(1,2);
        if (roll === 1) {
            return Die.rollAlphabet();
        } else {
            return Die.randomDesignatedRange(0,9);
        };
    },

    generateId: function() {
        var one = Die.rollLetterorInteger();
        var two = Die.rollLetterorInteger();
        var three = Die.rollLetterorInteger();
        var four = Die.rollLetterorInteger();
        var five = Die.rollLetterorInteger();
        var six = Die.rollLetterorInteger();
        var seven = Die.rollLetterorInteger();
        var eight = Die.rollLetterorInteger();
        var nine = Die.rollLetterorInteger();
        var ten = Die.rollLetterorInteger();
        var id = one + two + three + four + five + six + seven + eight + nine + ten;
        return id;
    },
};