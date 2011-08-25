
window.VenueDriver = class VenueDriver

  VENUE_URL = "http://127.0.0.1:3000/api/accounts/196/venues.json?username=&password=&callback=?"
  EVENT_URL = "http://venuedriver.com/api/venues/551/events.json?username=&password=&callback=?"

  venues: -> 
    $.getJSON VENUE_URL, (response) ->
      $('body').append(response.responseText)

  event: ->
    $.get EVENT , (json) ->
      alert json

  flickr: ->
    $.getJSON "http://api.flickr.com/services/feeds/photos_public.gne?tags=cat&tagmode=any&format=json&jsoncallback=?", (data) ->
      $.each data.items, (i,item) ->
        $("<img/>").attr("src", item.media.m).appendTo("body")
        .wrap("<a href='" + item.link + "'></a>")


$ ->
  venuedriver = new VenueDriver
  r = venuedriver.venues()
  console.log r.responseText()
