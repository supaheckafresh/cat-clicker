
//var cats = [
//    { name: 'Sally', imgUrl: 'images/pants-cat.jpg', id: 'cat' + 1},
//    { name: 'Frank', imgUrl: 'images/paper-cat.jpg', id: 'cat' + 2}
//];


var catsDiv = $('#cats');

var cat1Div = $('#cat1');
var cat1Name = 'Sally';

var cat2Div = $('#cat2');
var cat2Name = 'Frank';

// initialize points at 0
var cat1Points = 0;
var cat2Points = 0;

// display cat names above pictures
prepend('h2', cat1Name, cat1Div);
prepend('h2', cat2Name, cat2Div);

// display cat points below pictures
append('h2', 'Points: ' + cat1Points, cat1Div);
append('h2', 'Points: ' + cat2Points, cat2Div);


// click listener for counting points when catDiv picture is clicked with mouse
var catImage;

catsDiv.click( function updatePoints( evt ) {

    if (evt.target.tagName.toLowerCase() === 'img') {
        catImage = evt.target;
        if (catImage.parentNode.id === 'cat1') {
            cat1Points += 1;
            cat1Div.children(':last').replaceWith('<h2>Points: ' + cat1Points + '</h2>');
        } else if (catImage.parentNode.id === 'cat2') {
            cat2Points += 1;
            cat2Div.children(':last').replaceWith('<h2>Points: ' + cat2Points + '</h2>');
        } else {
            console.log('something is broken');
        }
    }
});

// helpers
function prepend(newElement, text, parentElement) {
    parentElement.prepend('<' + newElement + '>' + text + '</' + newElement + '>');
}

function append(newElement, text, parentElement) {
    parentElement.append('<' + newElement + '>' + text + '</' + newElement + '>');
}