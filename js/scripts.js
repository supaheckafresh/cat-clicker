
$(function(){

    var model = {

        init: function () {

            // placeholder data
            if ( !localStorage.cats ) {
                localStorage.cats = JSON.stringify(
                    {
                        lastClicked: null,

                        // will use last id if implementing add new cat feature, or possibly for reloading page last cat
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

        getAllAppData: function () {
            return JSON.parse(localStorage.cats);
        },

        getAllCats: function () {
            return JSON.parse(localStorage.cats).cats;
        },

        getOneCat: function (catId) {
            return JSON.parse(localStorage.cats).cats[catId - 1];
        },

        addPointFor: function (catId) {
            var data = this.getAllAppData();
            var catIndex = catId - 1;
            data.cats[catIndex].points += 1;
            this.save(data);
        },

        save: function (data) {
            localStorage.cats = JSON.stringify(data);
        }

    };


    var octopus = {

        init: function () {
            model.init();
            view.init();
        },

        getCats: function () {
            return model.getAllCats();
        },

        findCat: function (catId) {
            return model.getOneCat(catId);
        },

        addPointFor: function (catId) {
            model.addPointFor(catId);
            view.displayCat(catId);
        }
    };


    var view = {

        init: function () {
            this.catsListView = $('#cats-list');
            this.catImageView = $('#selected-cat')
            view.displayCatsList();

            // click listener for displaying cat picture when selected from list
            this.catsListView.on('click', '.cat', function () {
                var catId = $(this).attr('id');
                view.displayCat(catId);
            });

            // click listener for adding points when cat picture is clicked on
            this.catImageView.on('click', '.cat-img', function ()  {
                var catId = $(this).attr('rel');
                octopus.addPointFor(catId);
            });
        },

        displayCatsList: function () {
            var htmlStr = '';
            octopus.getCats().forEach(function (cat) {
                htmlStr += '<li>' +
                    '           <a class="cat" id="' + cat.id + '">' +
                                    cat.name + '' +
                    '           </a>' +
                    '       </li>';
            });
            this.catsListView.html(htmlStr);
        },

        displayCat: function (catId) {

            var cat = octopus.findCat(catId);

            // display cat image
            this.catImageView.html('<img src="' + cat.imgUrl + '" class="cat-img img-responsive" ' +
                                        'rel="' + cat.id + '">');

            // display name of cat
            this.catImageView.prepend('<h3>' + cat.name + '</h3>');

            // display number of cat clicks (points)
            this.catImageView.append('<h3>Points: ' + cat.points + '</h3>');
        }

    };

    octopus.init();

});


