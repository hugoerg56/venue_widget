(function() {
  var VenueDriver;
  VenueDriver = (function() {
    function VenueDriver() {}
    VenueDriver.API_TOKEN = "NVJEZ3T8A861Q2";
    VenueDriver.host = "venuedriver.com";
    VenueDriver.VENUE_URL = "http://" + VenueDriver.host + "/api/accounts/93/all_events?token=" + VenueDriver.API_TOKEN + "&callback=?";
    VenueDriver.venues_list = new Array();
    VenueDriver.prototype.venues = function() {
      $("#loading").css('display', '');
      $.getJSON(VenueDriver.VENUE_URL, function(data) {
        $('#main_table').append("<tbody></tbody>");
        $.each(data, function(i, item) {
          var table_data;
          table_data = "<tr>                  <td width='92' class='eventitem_text'>" + item.date + "</td>                  <td width='136' calss='eventitem_text'>Venue Location</td>                  <td width='130' class='eventitem_text'>Venue Title</td>                  <td class='eventitem_text'>" + item.title + "</td>                  <td align='right'><a href='venue.home_URL/buy/tickets/event/" + item.id + "'>Buy</a></td>                  </tr>";
          $('#main_table tbody').append(table_data);
        });
        $("#loading").css('display', 'none');
        $("#main_table").colorize({hiliteColor: '#CFCFCF'});  
        $("#main_table").tablesorter();
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
