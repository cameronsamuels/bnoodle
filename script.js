// declare scramble div
var scrambles = document.querySelector('#s'),
// declare selected cube
cube = "3x3",
// declare the notations array
n,
// declare the add on arrays
a,
// declare current scramble index
current = 0,
// set max amount of scrambles
max = Math.round(innerHeight / 100),
// set scramble amounts for each cube
amounts = {
    "3x3": 0.8,
    "2x2": 1.6,
    "4x4": 0.4,
    "5x5": 0.3,
    "Pyraminx": 1.6,
    "Skewb": 1.6
},
// set length of scrambles for each cube
scrambleLengths = {
    // 3x3 has 25 notation long scrambles
    '3x3': 25,
    // 2x2 has 9 notation long scrambles
    '2x2': 9,
    // 4x4 has 40 notation long scrambles
    '4x4': 40,
    // 5x5 has 60 notation long scrambles
    '5x5': 60,
    // Skewb has between 9 and 6 notation long scrambles
    'Skewb': Math.round(Math.max(Math.random()*9,6)),
    // Pyraminx has between 12 and 8 notation long scrambles
    'Pyraminx': Math.round(Math.max(Math.random()*12,8))
};
// generate a single notation
function generateNotation() {
    // generate notation for the selected cube
    switch (cube) {
        // for 3x3 and 2x2
        case "3x3" || "2x2":
            // set usable sides
            n = ["U", "D", "F", "B", "L", "R"],
            // set usable directions / add ons
            a = ["i", "i", "i", "2", "2", "", "", "", "", "", "", ""];
            // stop executing
            break;
        // for 4x4 or 5x5
        case "4x4" || "5x5":
            // set usable sides
            n = ["U", "D", "F", "B", "L", "R", "Fw", "Bw", "Rw", "Lw", "Uw", "Bw"],
            // set usable directions / add ons
            a = ["'", "'", "'", "2", "2", "", "", "", "", "", "", ""];
            // stop executing
            break;
        // for Pyraminx or Skewb
        case "Pyraminx" || "Skewb":
            // set usable sides
            n = ["U", "B", "L", "R"],
            // set usable directions / add ons
            a = ["i", "i", "", "", ""];
            // stop executing
            break;
    }
    // return notation value
    return n[Math.floor(n.length * Math.random())] + a[Math.floor(a.length * Math.random())]
}
// generate a whole entire scramble
function generateScramble() {
    // reset variables back to default values
    scramble = '', notation = "U", notation2 = '',
    // randomize lengths of Pyraminx and Skewb scrambles
    scrambleLengths['Pyraminx'] = Math.round(Math.max(Math.random()*12,8)),
    scrambleLengths['Skewb'] = Math.round(Math.max(Math.random()*9,6));
    // generate a notation length times
    for (i = 0; i < scrambleLengths[cube]; i++) {
        // set notation2 to the previous notation
        notation2 = notation;
        // generate notation
        notation = generateNotation();
        // regenerate as long as the notation is not reasonable
        while (
            // if notation2 == notation
            notation.charAt(0) == notation2.charAt(0)
            // if notation has the opposite face as previous notation
            || Math.floor(n.indexOf(notation.charAt(0)) / 2) == Math.floor(n.indexOf(notation2.charAt(0)) / 2) ) {
            // generate notation
            notation = generateNotation();
        }
        // Add the newly generated notation to the scramble variable
        scramble += notation + " ";
    }
    // return the scramble value
    return scramble;
}
// generate and display a scramble
function displayScramble() {
    // if reached max scrambles, clear screen and generate & display another one
    if (current >= max) scrambles.innerHTML = "<h1>" + generateScramble() + "</h1>", current = 1;
    // if still have more scrambles, generate & display another one
    else scrambles.innerHTML += "<h1>" + generateScramble() + "</h1>", current++;
}
// update selected cube
function updateCube() {
    // set current cube to dropdown value
    cube = document.querySelector('#cube').value;
    // generate and display scramble
    scrambles.innerHTML = "<h1>" + generateScramble() + "</h1>",
    // set current scramble to 1
    current = 1;
    // update scramble amount to generate
    max = Math.round((innerHeight / 100) * amounts[cube]);
}
// update cube on load
updateCube();
// add touch events if mobile
if (navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) scrambles.addEventListener('touchend', displayScramble);
// add click events if desktop
else scrambles.addEventListener('click', displayScramble);
// dynamically fill the screen with scrambles based on window size
document.addEventListener('resize', function() { max = Math.round((winnerHeight / 100) * amounts[cube]) }),
// disable touch scrolling
document.addEventListener('touchmove', function(e) { e.preventDefault() });