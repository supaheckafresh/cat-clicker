/**
 * List of cats
 */
var cats = {
        lastClicked: null,
        cats: [
            { name: 'Sally', imgUrl: 'images/pants-cat.jpg', points: 0},
            { name: 'Frank', imgUrl: 'images/paper-cat.jpg', points: 0},
            { name: 'Brenard', imgUrl: 'images/box-cat.jpg', points: 0},
            { name: 'Jennifer', imgUrl: 'images/luggage-cat.jpg', points: 0},
            { name: 'Logan', imgUrl: 'images/hat-cat.jpg', points: 0},
            { name: 'Grover', imgUrl: 'images/box-cat.jpg', points: 0},
            { name: 'Licky', imgUrl: 'images/luggage-cat.jpg', points: 0},
            { name: 'Mexico', imgUrl: 'images/hat-cat.jpg', points: 0}
        ]
    };

for (var i = 0, len = cats.cats.length; i < len; i++) {
    cats.cats[i].id = 'cat' + (i + 1);
}

// call display cats function on page load
displayCats();


/**
 * Display cat image, name and points for each cat in the list
 */
function displayCats() {

    // start by clearing out contents of #cats div
    $('#cats').empty();

    // go through list creating and displaying needed elements
    for (var i = 0, length = cats.cats.length; i < length; i++ ) {
        var cat = cats.cats[i];
        var currentRow;

        // create new row for each set of 3 cats including first row
        if (i % 3 === 0) {
            currentRow = 'r' + (i / 3);
            $('<div/>', {class: 'row ' + currentRow}).appendTo('#cats');
        }

        // append containing div for each cat
        $('<div/>', {id: cat.id, class: 'col-xs-4'}).appendTo('.' + currentRow);

        // display cat name
        $('<h3/>').text(cat.name).appendTo('#' + cat.id);

        // display cat image inside of div
        $('<img/>', {src: cat.imgUrl, class: 'img-responsive'}).appendTo('#' + cat.id);

        // display points
        $('<h3/>').text("Points: " + cat.points).appendTo('#' + cat.id);
    }
}


/**
 * Click listener for counting points when catDiv picture is clicked with mouse
 */
$('#cats').click( function updatePoints( evt ) {

    // only do anything if image is selected
    if (evt.target.tagName.toLowerCase() === 'img') {

        // translate div id (format "cat1", "cat2", etc.) into index of cat in "cats" list (0 based).
        var catIndex = evt.target.parentNode.id.slice(3) - 1;
        var cat = cats.cats[catIndex];

        // store the id of the last cat clicked on
        cats.lastClicked = cats.cats[catIndex].id;

        // increase points for that cat when clicked with mouse
        cat.points += 1;

        // display updated points by replacing the next sibling of the cat image
        $(evt.target).next('h3').replaceWith('<h3>Points: ' + cat.points + '</h3>');
    }
});