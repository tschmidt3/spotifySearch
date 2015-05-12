/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready( function() {
    $( ".btn" ).on( "click", function() {
        // zero out results if previous search has run
        $('.answers').html('');
        var searchArtists = $("#artistsSearch").val();
        search(searchArtists);
    });
});

var showAlbum = function(album) {
	
	// clone our result template code
	var result = $('.album .template').clone();
	
	// Set the question properties in result
	var name = result.find('#albumName');
	//questionElem.attr('href', question.link);
	name.text(album.name);
        
        var image = result.find('#albumImage');
        image.attr('src', album.images[0].url);
        
	return result;
};

var search = function(artist){
    var request = {
        q: artist,
        type: "artist"};
    var result = $.ajax({
        url: "https://api.spotify.com/v1/search",
        data: request,
        dataType: "json",
        type: "GET",
        })
    .done(function(result){
        console.log(result.artists.items[0].name);
        var artistID = result.artists.items[0].id;
        albumLookup(artistID);
    })
    .fail(function(jqXHR, error, errorThrown){
            var errorElem = showError(error);
            $('.search-results').append(errorElem);
    });
};  

var albumLookup = function(artistID){
    var tempURL = "https://api.spotify.com/v1/artists/" + artistID + "/albums";
    var result = $.ajax({
        url: tempURL,
        dataType: "json",
        type: "GET"
        })
    .done(function(result){
        console.log(result);
        var albumName = result.items[0].name; 
        var albumID = result.items[0].id; 
        var albumImage = result.items[0].images[0].url;
            $.each(result.items, function(i, item) {
			var temp = showAlbum(item);
                        console.log(temp);
			$('.answers').append(temp);
                    });
            
    })
    .fail(function(jqXHR, error, errorThrown){
            var errorElem = showError(error);
            $('.search-results').append(errorElem);
    });
};
    
        
        
