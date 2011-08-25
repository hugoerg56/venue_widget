(function() {
  var VenueDriver;
  VenueDriver = (function() {
    function VenueDriver() {}
    VenueDriver.VENUE_URL = "http://127.0.0.1:3000/api/accounts/1/venues.json?username=hugo&password=071086&callback=?";
    VenueDriver.EVENT_URL = "http://127.0.0.1:3000/api/venues/551/events.json?username=hugo&password=071086&callback=?";
    VenueDriver.resultado;
    VenueDriver.prototype.venues = function() {
      return $.getJSON("http://127.0.0.1:3000/api/accounts/1/venues.json?username=hugo&password=071086&callback=?", function(data) {
        return $.each(data, function(i, item) {
          return $('body').html($('body').html() + item.title + "</br>");
        });
      });
    };
    VenueDriver.prototype.event = function() {
      return $.get(EVENT, function(json) {
        alert(json);
        return true;
      });
    };
    VenueDriver.prototype.flickr = function() {
      return $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags=cat&tagmode=any&format=json&jsoncallback=?", function(data) {
        alert(data);
        return $.each(data.items, function(i, item) {
          return $("<img/>").attr("src", item.media.m).appendTo("body").wrap("<a href='" + item.link + "'></a>");
        });
      });
    };
    return VenueDriver;
  })();
  $(function() {
    var venuedriver;
    venuedriver = new VenueDriver;
    return console.log(venuedriver.venues());
  });
}).call(this);
