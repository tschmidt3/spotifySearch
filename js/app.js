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

var showAlbum = function(album, songNames) {
	
	// clone our result template code
	var result = $('.album .template').clone();
	
	// Set the question properties in result
	var name = result.find('#albumName');
	name.text(album.name);
        
        var image = result.find('#albumImage');
        image.attr('src', album.images[0].url);
        var link = result.find('#albumLink');
        link.attr('href', album.external_urls.spotify);
        
        var temp = result.find("#popularSong");
        temp.html(songNames);
        
        if(songNames){
            
        } else{
            temp.text("This is the artists whos albums are shown below");
        };
        
	return result;
};

var showSong = function(){
    
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
        var temp = showAlbum(result.artists.items[0]);
        $('.answers').append(temp);
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
        var albumName = result.items[0].name; 
        var albumID = result.items[0].id; 
        //songLookup(albumID);
        var albumImage = result.items[0].images[0].url;
            $.each(result.items, function(i, item) {
			
                        
                        //var temp = showAlbum(item);
			//$('.answers').append(temp);
                        songLookup(item.id, item);
                    });
            
    })
    .fail(function(jqXHR, error, errorThrown){
            var errorElem = showError(error);
            $('.search-results').append(errorElem);
    });
};

var songLookup = function(albumID, albumInfo){
    var tempURL = "https://api.spotify.com/v1/albums/"+albumID+"/tracks";
    var result = $.ajax({
        url: tempURL,
        dataType: "json",
        type: "GET"
        })
    .done(function(result){
        var songNames = "";
        $.each(result.items, function(i, item){
            var temp = i + 1;
            songNames = songNames + " [" + temp + ". "+ item.name +"]";
        });
        //console.log(songNames);
        
        var temp = showAlbum(albumInfo, songNames);
	$('.answers').append(temp);
        
    })
    .fail(function(jqXHR, error, errorThrown){
        var errorElem = showError(error);
        $('.search-results').append(errorElem);
    });
    
};
    
        
        
