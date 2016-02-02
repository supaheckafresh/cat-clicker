
$(function(){

    var model = {

        init: function () {

            // placeholder data
            if ( !localStorage.cats ) {
                localStorage.cats = JSON.stringify(
                    {
                        lastClicked: null,

                        // will use last id if implementing add new cat feature
                        lastId: 8,
                        cats: [
                            { name: 'Sally', imgUrl: 'images/pants-cat.jpg', points: 0, id: 1},
                            { name: 'Frank', imgUrl: 'images/paper-cat.jpg', points: 0, id: 2},
                            { name: 'Brenard', imgUrl: 'images/box-cat.jpg', points: 0, id: 3},
                            { name: 'Jennifer', imgUrl: 'images/luggage-cat.jpg', points: 0, id: 4},
                            { name: 'Logan', imgUrl: 'images/hat-cat.jpg', points: 0, id: 5},
                            { name: 'Grover', imgUrl: 'images/box-cat.jpg', points: 0, id: 6},
                            { name: 'Licky', imgUrl: 'images/luggage-cat.jpg', points: 0, id: 7},
                            { name: 'Mexico', imgUrl: 'images/hat-cat.jpg', points: 0, id: 8}
                        ]
                    }
                )
            }
        },

        getAllCats: function () {
            return JSON.parse(localStorage.cats).cats;
        }
    };


    var octopus = {

        init: function () {
            model.init();
            view.init();
        },

        getCats: function () {
            return model.getAllCats();
        }
    };


    var view = {

        init: function () {
            view.displayCatsList();
        },

        displayCatsList: function () {
            this.catsList = $('#cats-list');
            var cats = octopus.getCats();

            for (var i = 0, len = cats.length; i < len; i++) {
                this.catsList.append('<li>' + cats[i].name + '</li>');
            }

        }

    };

    octopus.init();
});


