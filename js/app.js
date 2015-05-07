/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready( function() {
    $( ".btn" ).on( "click", function() {
        var searchArtists = $("#artistsSearch").val();
        search(searchArtists);
    });
});

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
            console.log(result.artists.items[0].id);  
        })
    .fail(function(jqXHR, error, errorThrown){
            var errorElem = showError(error);
            $('.search-results').append(errorElem);
    });
        
        };      
        
        
