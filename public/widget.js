(function() {
  var VenueDriver;
  window.VenueDriver = VenueDriver = (function() {
    var EVENT_URL, VENUE_URL;
    function VenueDriver() {}
    VENUE_URL = "http://127.0.0.1:3000/api/accounts/196/venues.json?username=&password=&callback=?";
    EVENT_URL = "http://venuedriver.com/api/venues/551/events.json?username=&password=&callback=?";
    VenueDriver.prototype.venues = function() {
      return $.getJSON(VENUE_URL, function(response) {
        return $('body').append(response.responseText);
      });
    };
    VenueDriver.prototype.event = function() {
      return $.get(EVENT, function(json) {
        return alert(json);
      });
    };
    VenueDriver.prototype.flickr = function() {
      return $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags=cat&tagmode=any&format=json&jsoncallback=?", function(data) {
        return $.each(data.items, function(i, item) {
          return $("<img/>").attr("src", item.media.m).appendTo("body").wrap("<a href='" + item.link + "'></a>");
        });
      });
    };
    return VenueDriver;
  })();
  $(function() {
    var r, venuedriver;
    venuedriver = new VenueDriver;
    r = venuedriver.venues();
    return console.log(r.responseText());
  });
}).call(this);
