// Wait for page to load
$(document).ready(function() {
    // Array of animal
    var topics = ["fox", "dog", "cat", "sloth", "monkey"];

    // Generic function display the topics
    function renderTheButtons() {
        // delete the topic added before  
        $("#topicsView").empty();

        // Loops through the array of topics
        for (var i = 0; i < topics.length; i++) {
            // Dynamically generate the buttons when the page is loaded

            // jQUery  
            var a = $("<button type='button'>") // all jQuery needs this code $('<button>') 
            a.addClass("topicButton");
            a.addClass("btn btn-primary");
            a.attr("data-name", topics[i]); // add a data-attribute
            a.text(topics[i]); // Provided the initial button text
            $("#topicsView").append(a); // buttons displaying to the HTML
        }
    }

    // handl when one button is clicked
    $("#addAnimal").on("click", function() {

        console.log("Submit button is clicked");


        // takes the input from the user input
        var animal = $("#animalInput").val().trim();

        console.log(animal + " is added to the Array");
        if (animal != "") {

            //add the user input to the topics array
            topics.push(animal);
            // Our array then runs which handles the processing of our topic array
            renderTheButtons();
        } else {
            $("#animalInput").attr("placeholder", "Enter something here to search.");
            renderTheButtons();
        }

        // When users can hit "enter" instead of clicking on the button and it won't move to the next page
        return false;
    });


    //shows giphy images
    function showAnimalGiphy() {

        $("#giphyView").empty();
        var animal = $(this).attr("data-name");

        //applying the public key, q, and limit
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=funny+" + animal + "&api_key=dc6zaTOxFJmzC&limit=10&offset=0";


        $.ajax({
                url: queryUrl,
                method: 'GET'
            })
            .done(function(response) {

                // Creates a generic div to hold the topic
                var animalDiv = $("<div class='topicImage'>");
                console.log(response);
                for (i = 0; i < response.data.length; i++) {
                    var stillImage = response.data[i].images.fixed_height_still.url;
                    console.log(stillImage);

                    var animateImage = response.data[i].images.fixed_height.url;
                    console.log("Moving" + animateImage);

                    var rating = response.data[i].rating;
                    console.log(rating);

                    // ratings
                    var pOne = $("<h4>").text("Rating: " + rating.toUpperCase());
                    animalDiv.append(pOne);

                    var image = $("<img>").attr("src", stillImage); //Passes still image link to the image src
                    image.attr("playsrc", animateImage); //creates playsrc attr and passes animate image link to the image playsrc
                    image.attr("stopsrc", stillImage); //creates stopsrc attr and passes still image link to the image stopsrc

                    animalDiv.append(image);


                    $("#giphyView").append(animalDiv);

                    image.addClass("playAnimatedGiphy"); // adding a class to image tag

                }
            });
    }

    //funcation swaping between still/animated giphy
    function swapGiphy() {
        //animage Image 
        var animateImage = $(this).attr("playsrc");

        console.log(animateImage + "animated image");


        //Stop Image 
        var stopImage = $(this).attr("stopsrc");

        console.log(stopImage + "still image");

        //Swap image condition
        if ($(this).attr("playsrc") == $(this).attr("src")) {
            //This changes the image src
            $(this).attr("src", stopImage);
        } else {
            $(this).attr("src", animateImage);
        }
    }


    // call the renderTheButtons function
    renderTheButtons();

    // Generic function for displaying the Gif
    $(document).on("click", ".topicButton", showAnimalGiphy);
    $(document).on("click", ".playAnimatedGiphy", swapGiphy);


});
