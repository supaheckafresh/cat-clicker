
$(function(){

    var model = {

        init: function () {

            // placeholder data
            if ( !localStorage.cats ) {
                localStorage.cats = JSON.stringify(
                    {
                        // set first cat as lastClicked if program being run for first time.
                        lastClicked: 1,

                        // don't show admin view on when application is first run
                        adminModeActive: false,

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

            this.disableAdminMode();
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
            data.cats[catIndex].points = parseInt(++data.cats[catIndex].points);
            this.save(data);
        },

        save: function (data) {
            localStorage.cats = JSON.stringify(data);
        },

        setCurrentCat: function (catId) {
            var data = this.getAllAppData();
            data.lastClicked = catId;
            this.save(data);
        },

        getLastCat: function () {
            return JSON.parse(localStorage.cats).lastClicked;

        },

        getAdminState: function () {
            return model.getAllAppData().adminModeActive;
        },

        toggleAdminMode: function () {
            var data = model.getAllAppData();

            // flip value of adminModeActive
            data.adminModeActive = !data.adminModeActive;
            this.save(data);

            octopus.refreshAdminView();
        },

        disableAdminMode: function () {
            var data = this.getAllAppData();
            if (data.adminModeActive) {
                data.adminModeActive = false;
            }
            this.save(data);
        }

    };


    var octopus = {

        init: function () {
            model.init();
            view.init();
            adminView.init();
        },

        getCats: function () {
            return model.getAllCats();
        },

        findCat: function (catId) {
            return model.getOneCat(catId);
        },

        addPointFor: function (catId) {
            model.addPointFor(catId);
            view.displayCatView(catId);
        },

        updateCat: function (cat) {
            var data = model.getAllAppData();

            // update cat record with new information
            data.cats[cat.id - 1] = cat;
            model.save(data);
        },

        lastCat: function () {
            return model.getLastCat();
        },

        setCurrentCat: function (catId) {
            model.setCurrentCat(catId);
        },

        getAdminState: function () {
            return model.getAdminState();
        },

        toggleAdminMode: function () {
            model.toggleAdminMode();
        },

        disableAdminView: function () {
            model.disableAdminMode();
        },

        refreshAdminView: function () {
            adminView.render();
        }
    };


    var view = {

        init: function () {
            this.catsListView = $('#cats-list-view');
            this.catImageView = $('#selected-cat-view');

            // display list of cats by name
            view.displayCatsListView();

            // display last clicked cat in cat view on page load
            view.displayCatView(octopus.lastCat());

            // click listener for displaying cat picture when selected from list
            this.catsListView.on('click', '.cat', function () {

                // disable admin mode and hide admin view whenever switching cats
                octopus.disableAdminView();
                adminView.render();

                var catId = $(this).attr('id');
                view.displayCatView(catId);

                octopus.setCurrentCat(catId);
            });

            // click listener for adding points when cat picture is clicked on
            this.catImageView.on('click', '.cat-img', function ()  {
                var catId = $(this).attr('rel');
                octopus.addPointFor(catId);
            });
        },

        displayCatsListView: function () {
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

        displayCatView: function (catId) {

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

    var adminView = {

        init: function () {
            this.adminForm = $('#admin-form');
            this.toggleAdminBtn = $('#toggle-admin-btn');

            this.toggleAdminBtn.on('click', function () {
                octopus.toggleAdminMode();
            });
        },

        render: function () {
            if (octopus.getAdminState() === true) {

                var currentCat = octopus.findCat( octopus.lastCat() );

                this.adminForm.append('<h3>Edit Current Cat</h3>');

                // append inputs to admin div with info from current cat
                this.adminForm.append('<span class="col-xs-3 text-right">Name: </span><input name="name" ' +
                                        'class="col-xs-9" type="text" value="' + currentCat.name + '">');

                this.adminForm.append('<span class="col-xs-3 text-right">Points: </span><input name="points" ' +
                                        'class="col-xs-9" type="number" value="' + currentCat.points + '">');

                this.adminForm.append('<span class="col-xs-3 text-right">Image URL: </span><input name="img-url" ' +
                                        'class="col-xs-9" type="text" value="' + currentCat.imgUrl + '">');


                this.adminForm.append('<button type="submit" id="save-btn">Save</button>');
                this.adminForm.append('<button type="submit" id="cancel-btn">Cancel</button>');

                // add click listener for save button
                this.adminForm.on('click', '#save-btn', function () {
                    var adminForm = $('#admin-form');
                    var newName = adminForm.find('input[name="name"]').val();
                    var newPoints = adminForm.find('input[name="points"]').val();
                    var newImgUrl = adminForm.find('input[name="img-url"]').val();

                    var cat = octopus.findCat(octopus.lastCat());
                    cat.name = newName;
                    cat.points = newPoints;
                    cat.imgUrl = newImgUrl;

                    octopus.updateCat(cat);
                });

            } else {
                this.adminForm.html('');
            }
        }


    };

    octopus.init();


});


