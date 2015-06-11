/**
 * For Probability!
 * @constructor
 */
var Distribution = function() {
};

Distribution.prototype = {
    identifier : 'Distribution',
    constructor : Distribution,
    /**
     * @param scale {number}
     * @returns {number}
     */
    chance : function(scale) {
        if (!scale) scale = 1;
        return Math.random() * scale;
    },
    /**
     * @param fielder {Player}
     * @returns {boolean}
     */
    error : function(fielder) {
        return (100-fielder.skill.defense.fielding)*0.40 + 4 > Math.random()*100;
    },
    /**
     * @param power
     * @param flyAngle
     * @returns {number}
     */
    landingDistance : function(power, flyAngle) {
        return (50 + Math.random()*300 + (power/100)*75) * (1 - Math.abs(flyAngle - 30)/60);
    },
    /**
     * @returns {{x: number, y: number}}
     */
    pitchLocation : function() {
        var x, y;
        if (Math.random() < 0.5) {
            x = 50 + Math.floor(Math.random()*70) - Math.floor(Math.random()*15);
        } else {
            x = 150 + Math.floor(Math.random()*15) - Math.floor(Math.random()*70);
        }
        y = 30 + (170 - Math.floor(Math.sqrt(Math.random()*28900)));
        return {x: x, y: y};
    },
    /**
     * swing centering basis
     * @returns {number}
     */
    centralizedNumber : function() {
        return 100 + Math.floor(Math.random()*15) - Math.floor(Math.random()*15);
    },
    /**
     * @param eye {Player.skill.offense.eye}
     * @param x
     * @param y
     * @param umpire {Umpire}
     */
    swingLikelihood : function(eye, x, y, umpire) {
        var swingLikelihood = (200 - Math.abs(100 - x) - Math.abs(100 - y))/2;
        if (x < 60 || x > 140 || y < 50 || y > 150) { // ball
            swingLikelihood = Math.min(swingLikelihood, 100 - eye) - 15*umpire.count.balls;
        } else {
            swingLikelihood = Math.max(45, (2*swingLikelihood + eye)/3);
        }
        return swingLikelihood - 35 + 10*(umpire.count.balls + 2*umpire.count.strikes);
    },
    /**
     * @param target {number} 0-200
     * @param control {number} 0-100
     * @returns {number}
     */
    pitchControl : function(target, control) {
        return Math.min(199.9, Math.max(0.1, target + (50 - Math.random()*100)/(1+control/100)));
    },
    /**
     * @param pitch {Game.pitchInFlight}
     * @param x {number}
     * @param y {number}
     * @returns {object|{x: number, y: number}}
     */
    breakEffect : function(pitch, x, y) {
        var effect = {};
        effect.x = Math.floor(x + (pitch.breakDirection[0]
            * ((0.5+Math.random()*pitch.break)/100)));
        effect.y = Math.floor(y + (pitch.breakDirection[1]
            * ((0.5+Math.random()*pitch.break)/100))/(0.5 + y/200));
        return effect;
    },
    /**
     * Determine the swing target along an axis
     * @param target {number} 0-200
     * @param actual {number} 0-200
     * @param eye {number} 0-100
     * @returns {number} 0-200
     */
    swing : function(target, actual, eye) {
        eye = Math.max(eye, 100);
        return 100 + (target - 100)*(0.5+Math.random()*eye/200) - actual;
    }
};

for (var fn in Distribution.prototype) {
    if (Distribution.prototype.hasOwnProperty(fn)) {
        Distribution[fn] = Distribution.prototype[fn];
    }
}

exports.Distribution = Distribution;