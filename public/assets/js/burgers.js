// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".change-sleep").on("click", function(event) {
        var id = $(this).data("id");
        var newSleep = $(this).data("newsleep");

        var newSleepState = {
            sleepy: newSleep
        };

        // Send the PUT request.
        $.ajax("/api/cats/" + id, {
            type: "PUT",
            data: newSleepState
        }).then(
            function() {
                console.log("changed sleep to", newSleep);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $("#create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var dt = new Date();

        var newBurger = {
            burger_name: $("#burgerName").val().trim(),
            devoured: 0,
            date: '2017-11-13 12:33:51'
        };

        console.log('NEWBURGER!' , newBurger);

        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("created new burger");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});
