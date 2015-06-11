helper = {
    pitchDefinitions : {
        '4-seam' :      [0, 0, 1], //x movement, y movement, speed ratio
        '2-seam' :      [20, -20, 0.90],
        'cutter' :      [-25, -20, 0.95],
        'sinker' :      [-15, -30, 0.95],

        'slider' :      [-50, -35, 0.9],
        'fork'   :      [0, -70, 0.87],
        'curve'  :      [0, -90, 0.82],

        'change' :    [0, -10, 0.88]
    },
    selectRandomPitch : function() {
        return [
            '4-seam', '2-seam', 'cutter', 'sinker',
            'slider', 'fork', 'curve',
            'change'
        ][Math.floor(Math.random()*8)]
    }
};

exports.helper = helper;