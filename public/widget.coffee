
class VenueDriver

  @VENUE_URL = "http://127.0.0.1:3000/api/accounts/1/venues.json?username=hugo&password=071086&callback=?"
  @EVENT_URL = "http://127.0.0.1:3000/api/venues/551/events.json?username=hugo&password=071086&callback=?"
  @resultado 

  venues: -> 
    $.getJSON "http://127.0.0.1:3000/api/accounts/1/venues.json?username=hugo&password=071086&callback=?", (data) ->
      $.each data, (i,item) ->
        $('body').html($('body').html() + item.title+ "</br>")

  event: ->
    $.get EVENT , (json) ->
      alert json
      return true

  flickr: ->
    $.getJSON "http://api.flickr.com/services/feeds/photos_public.gne?tags=cat&tagmode=any&format=json&jsoncallback=?", (data) ->
      alert data
      $.each data.items, (i,item) ->
        $("<img/>").attr("src", item.media.m).appendTo("body")
        .wrap("<a href='" + item.link + "'></a>")


$ ->
  venuedriver = new VenueDriver
  console.log venuedriver.venues()


