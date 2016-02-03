
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
        },

        getOneCat: function (catId) {
            return JSON.parse(localStorage.cats).cats[catId - 1];
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
        }
    };


    var view = {

        init: function () {
            this.catsListView = $('#cats-list');
            this.catImageView = $('#selected-cat')
            view.displayCatsList();

            this.catsListView.on('click', '.cat', function ( evt ) {
                var catId = evt.target.id;
                var imgUrl = octopus.findCat(catId).imgUrl;
                view.displayCatImage(imgUrl);
            })
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

        displayCatImage: function (imgUrl) {
            this.catImageView.html('<img src="' + imgUrl + '" class="img-responsive">');
        }

    };

    octopus.init();

});


