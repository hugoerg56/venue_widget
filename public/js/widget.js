(function() {
  var VenueDriver;
  VenueDriver = (function() {
    function VenueDriver() {}
    VenueDriver.API_USERNAME = "ivanacostarubio";
    VenueDriver.API_PASSWORD = "letmein";
    VenueDriver.VENUE_URL = "http://venuedriver.com/api/accounts/44/venues.json?username=" + VenueDriver.API_USERNAME + "&password=" + VenueDriver.API_PASSWORD + "&callback=?";
    VenueDriver.venues_list = new Array();
    VenueDriver.prototype.venues = function() {
      return $.getJSON(VenueDriver.VENUE_URL, function(data) {
        $("#loading").css('display', '');
        return $.each(data, function(i, item) {
          VenueDriver.events(item);
          if (i === (data.length - 1)) {
            return $("#loading").css('display', 'none');
          }
        });
      });
    };
    VenueDriver.events = function(venue) {
      $.ajax({
        url: "http://venuedriver.com/api/venues/" + venue.id + "/events.json?username=" + this.API_USERNAME + "&password=" + this.API_PASSWORD + "&callback=?",
        dataType: 'jsonp',
        cache: true,
        success: function(data) {
          return $.each(data, function(i, item) {
            var table_data;
            table_data = "<div id='selectevent_eventitem'><table width='100%' height='49px' cellspacing='0' cellpadding='0'><tr>                  <td width='92' class='eventitem_text'>" + item.date + "</td>                  <td width='136' calss='eventitem_text'>" + venue.city + ", " + venue.state + "</td>                  <td width='130' class='eventitem_text'>" + venue.title + "</td>                  <td class='eventitem_text'>" + item.title + "</td>                  <td align='right'><a href='" + venue.home_URL + "/buy/tickets/event/" + item.id + "'>Buy</a></td>                  </tr></table></div>";
            return $('#wrapper').append(table_data);
          });
        }
      });
      return true;
    };
    return VenueDriver;
  })();
  $(function() {
    var venuedriver;
    venuedriver = new VenueDriver;
    return console.log(venuedriver.venues());
  });
}).call(this);
