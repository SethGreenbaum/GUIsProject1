$( document ).ready(function() {
    $('select').formSelect();

    var partyObject =[
        {name: "Hoe Down", keyword: "country", drink: "ACID"},
        {name: "Totally Radical", keyword:"80s", drink: "city slicker"},
        {name: "Geek Night", keyword:["megaman","rick and morty","smash bros"], drink: "grim reaper"},
        {name: "Basic Bitch", keyword:"usa top 40", drink: "cosmopolitan"},
        {name: "Pre-Gaming", keyword:["top 40", "today's hits","party"], drink: "jello shots"},
        {name: "Night-in", keyword:["chill","relax","classic acoustic"], drink: "whisky mac"},
        {name: "Porch Sitting", keyword:["country pop","chillin on a dirt road" ], drink: "alabama slammer"},
        {name: "So Ya Got Dumped", keyword:"breakup songs", drink: "boozy snickers milkshake"},
        {name: "Mad Coding", keyword:["gaming","hallow knight"], drink: "brain fart"},
        {name: "Mine All Day", keyword:"minecraft soundtrack", drink: "limeade"},
        {name: "Hungover AF", keyword:["meditation", "relaxation"], drink: "corpse reviver #2"},
        {name: "Summer BBQ", keyword:["bbq", "4th of july"], drink: "Ice Pick #1"},
        {name: "Frat Party", keyword:["party","bro"], drink: "cherry electric lemonade"},
        {name: "Guys Night", keyword:["party","pump up"], drink: "Gentleman's Club"},
        {name: "Dungeons & Dragons", keyword:["lord of the rings","elder scrolls"],drink: "gideon's green dinosaur"},
        {name: "Girls Night", keyword:["dance","pop","club"],drink: "champagne cocktail"},
        {name: "Party of 1", keyword:["lonely","sad","down in the dumps"],drink: "liquor"},
    ]
    
    var clientId = "332c5e1a03234f338379231dadc0809c";
    var redirectUri = window.location.href;
    var authorizationToken = "Bearer "; //this returns in the url after login
    // "https://api.spotify.com/v1/search?q=" + searchTerm + "&type=artist";
     //this is the user input
    var scope = 'user-library-modify';//this will be added to our auth link

    var spotAuth = $("#spotify-auth");
    var mixButton = $("#mix-button");
    var spotifyQuery = "prince"
    var spotifyCat = "playlist"
    var returnedAuthorizationToken; 

    var cocktailTitle = $("#cocktail-title");
    var cocktailImage = $("#cocktail-image");
    var cocktailRecipe = $("#cocktail-recipe");
    var playlistOneTitle = $("#playlist-one-title");
    var playlistOneDesc = $("#playlist-one-desc");
    var playlistOneLink =$("#playlist-one-link");
    var playlistOneImage = $("#playlist-one-image");
    var playlistTwoTitle = $("#playlist-two-title");
    var playlistTwoDesc = $("#playlist-two-desc");
    var playlistTwoLink =$("#playlist-two-link");
    var playlistTwoImage = $("#playlist-two-image");
    var playlistThreeTitle = $("#playlist-three-title");
    var playlistThreeDesc = $("#playlist-three-desc");
    var playlistThreeLink =$("#playlist-three-link");
    var playlistThreeImage = $("#playlist-three-image");
    var drinkGlass = $("#drink-glass");
    var recipeCard =$("#recipe-card");
    var playlistCards =$("#playlist-cards");
    var recipeList = $("#recipe-list");

    function authTokenLink(){
        var spotifyAuthLink = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=` + encodeURIComponent(scope) + '&redirect_uri=' + redirectUri;
        console.log(spotifyAuthLink)
        window.location.href = spotifyAuthLink;
    };
    //http-server -p 8080
    
    function getAuthorizationToken(){

        returnedAuthorizationToken = location.hash.substr(1);
        authorizationToken = "Bearer "+returnedAuthorizationToken.substring(returnedAuthorizationToken.indexOf("=")+1,returnedAuthorizationToken.indexOf("&"));
        console.log(authorizationToken);

    
    };


    spotAuth.on("click", function(event){
        event.preventDefault();
        authTokenLink()});
    

    mixButton.on("click",function(event){
        event.preventDefault();
        getAuthorizationToken();
        spotAuth.attr("class","btn waves-effect waves-light hide")
        var selected = parseInt($("#form-options").val());
        console.log("item selected",selected);
        console.log(partyObject[selected].name);
        spotifyQuery = partyObject[selected].keyword;
        var searchTerm = partyObject[selected].drink;
        var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchTerm;
        recipeCard.attr("class","card-content white-text");
        playlistCards.attr("class","card-content white-text");

        
    $.ajax({
        url: "https://api.spotify.com/v1/search?q="+spotifyQuery+"&type="+spotifyCat,
        type: 'GET',
        headers: {
            'Authorization' :  authorizationToken
        },
        success: function(data) {
            console.log(data);
            var imageOne = data.playlists.items[0].images[0].url
            var hrefOne = data.playlists.items[0].external_urls.spotify
            playlistOneTitle.text(data.playlists.items[0].name);
            playlistOneImage.attr("src",imageOne);
            playlistOneLink.attr("href",hrefOne);
            playlistOneDesc.text(data.playlists.items[0].description);
            var imageTwo = data.playlists.items[1].images[0].url
            var hrefTwo = data.playlists.items[1].external_urls.spotify
            playlistTwoTitle.text(data.playlists.items[1].name);
            playlistTwoImage.attr("src",imageTwo);
            playlistTwoLink.attr("href",hrefTwo);
            playlistTwoDesc.text(data.playlists.items[1].description);
            var imageThree = data.playlists.items[2].images[0].url
            var hrefThree = data.playlists.items[2].external_urls.spotify
            playlistThreeTitle.text(data.playlists.items[2].name);
            playlistThreeImage.attr("src",imageThree);
            playlistThreeLink.attr("href",hrefThree);
            playlistThreeDesc.text(data.playlists.items[2].description);
        }
    });
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        cocktailTitle.text(response.drinks[0].strDrink);
        drinkGlass.text(response.drinks[0].strGlass);
        cocktailRecipe.text(response.drinks[0].strInstructions);
        var imageSrc = response.drinks[0].strDrinkThumb;
        cocktailImage.attr("src", imageSrc);
        
        for (i=1; i<15 ; i++ ) {
            var stringIndex = "strIngredient"+i;
            var stringAmount = "strMeasure"+i;
            var drinksListObject = response.drinks[0];
            console.log(stringIndex)
            console.log(drinksListObject[stringIndex])
            if (drinksListObject[stringIndex] !== null){
            var newIngredient = $("<li>");
            var ingredientClass = "collection-item ingredient"
            recipeList.append(newIngredient);
            newIngredient.attr("class",ingredientClass);
            newIngredient.text(response.drinks[0][stringIndex]+":       "+response.drinks[0][stringAmount]);
            };
        };


    });
    


    });


    
    

    
    });

