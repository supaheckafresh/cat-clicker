
var catDiv = document.getElementById('cat');
var pointsDiv = document.getElementById('points');

var points = 0;

// display initial points at 0
pointsDiv.innerHTML = '<h2>Points: ' + points + '</h2>';

// click listener for counting points when catDiv picture is clicked with mouse
catDiv.addEventListener('click', function addPoint(){
    points += 1;

    //update points being displayed
    pointsDiv.innerHTML = '<h2>Points: ' + points + '</h2>';
});


