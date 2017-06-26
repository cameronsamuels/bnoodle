var scrambles = document.querySelector('#s'), cube = "3x3";
    
    function generateNotation() {
    switch (cube) {
        case "3x3" || "2x2":
            n = ["U", "D", "F", "B", "L", "R"],
            a = ["i", "i", "i", "2", "2", "", "", "", "", "", "", ""];
            break;
        case "Pyraminx":
            n = ["U", "B", "L", "R"],
            a = ["i", "i", "", "", ""];
            break;
        case "4x4":
            n = ["U", "D", "F", "B", "L", "R", "Fw", "Bw", "Rw", "Lw", "Uw", "Bw"],
            a = ["'", "'", "'", "2", "2", "", "", "", "", "", "", ""];
            break;
        case "5x5":
            n = ["U", "D", "F", "B", "L", "R", "Fw", "Bw", "Rw", "Lw", "Uw", "Bw"],
            a = ["'", "'", "'", "2", "2", "", "", "", "", "", "", ""];
            break;
        case "Skewb":
            n = ["U", "B", "L", "R"],
            a = ["i", "i", "", "", ""];
            break;
        default:
            n = ["U", "D", "F", "B", "L", "R"],
            a = ["i", "i", "i", "2", "2", "", "", "", "", "", "", ""];
    }
    return n[Math.floor(n.length * Math.random())] + a[Math.floor(a.length * Math.random())]
}
var scrambleLengths = {}, a, n;
scrambleLengths['3x3'] = 25, scrambleLengths['2x2'] = 9, scrambleLengths['4x4'] = 40, scrambleLengths['5x5'] = 60, scrambleLengths['Skewb'] = Math.round(Math.max(Math.random()*9,6)), scrambleLengths['Pyraminx'] = Math.round(Math.max(Math.random()*12,8));
    
    function generateScramble() {
    scramble = '', notation = "U", notation2 = '', scrambleLengths['Pyraminx'] = Math.round(Math.max(Math.random()*12,8)), scrambleLengths['Skewb'] = Math.round(Math.max(Math.random()*9,6));
    for (i = 0; i < scrambleLengths[cube]; i++) {
        notation2 = notation;
        notation = generateNotation();
        while (notation.charAt(0) == notation2.charAt(0) || Math.floor(n.indexOf(notation.charAt(0)) / 2) == Math.floor(n.indexOf(notation2.charAt(0)) / 2) || notation2.charAt(0) == notation.charAt(0)) {
            notation = generateNotation();
        }
        scramble += notation + " ";
    }
    return scramble;
}

    
    function displayScramble(){current>=max?(scrambles.innerHTML="<h2>Tap anywhere to generate a scramble</h2><hr /><h1>"+generateScramble()+"</h1>",current=1):current<max&&(scrambles.innerHTML+="<hr /><h1>"+generateScramble()+"</h1>",current++)}var current=0,max=Math.round(window.innerHeight/100),n,a;
    
    var m = {
        "3x3":0.8,"2x2":1.6,"4x4":0.4,"5x5":0.3,"Pyraminx":1.6,"Skewb":1.6
    }
    function updateCube() {
    cube = document.querySelector('#cube').value;
    scrambles.innerHTML="<h2>Tap anywhere to generate a scramble</h2><hr /><h1>"+generateScramble()+"</h1>",current=1;
    max = Math.round((window.innerHeight/100)*m[cube]);
}
    
updateCube(),navigator.userAgent.match(/iPhone|iPad|iPod/i)||navigator.userAgent.match(/Android/i)||(scrambles.onclick=displayScramble),document.body.onresize=function(){max=Math.round((window.innerHeight/100)*m[cube])},document.body.ontouchmove=function(e){e.preventDefault()}