(function() {
  var VenueDriver;
  VenueDriver = (function() {
    function VenueDriver() {}

  	options = {
  		api_token: "NVJEZ3T8A861Q2",
      account: "93"	  
  	}
  	
    try{
  	  params = {
  		  api_token: VenueConfig.api_token,
        account: VenueConfig.account
  	  };
  	}catch(e){
  	  params = {}
  	}

  	jQuery.extend(options, params);
  	
    $(function initialize(){
      VenueDriver.api_token = options.api_token;
      VenueDriver.account = options.account;
      VenueDriver.host = "venuedriver.com";
      VenueDriver.api_url = "http://" + VenueDriver.host + "/api/accounts/" + VenueDriver.account + "/all_events?token=" + VenueDriver.api_token + "&callback=?";
    });
    
    VenueDriver.prototype.start = function(){
      $.getJSON(VenueDriver.api_url, function(data) { 
        VenueDriver.fill_table(data);
      });
    };
    
    VenueDriver.fill_table = function(data) {
      $('#main_table').append("<tbody></tbody>");
      $.each(data, function(i, item) {
        var table_data;
        $.each(item.events, function(i, event){
          table_data = "<tr>                  <td width='92' class='eventitem_text'>" + event.date + "</td>                  <td width='136' calss='eventitem_text'>" + item.venue.city + ", " + item.venue.state +"</td>                  <td width='130' class='eventitem_text'>" + item.venue.title + "</td>                  <td class='eventitem_text'>" + event.title + "</td>                  <td align='right'><a href='" + item.venue.home_URL + "buy/tickets/event/" + event.id + "'>Buy</a></td>                  </tr>";
          $('#main_table tbody').append(table_data);
        });
      });
      $("#loading").css('display', 'none'); 
      VenueDriver.style_table();
    };
    
    VenueDriver.style_table = function() {
      $("#main_table").tablesorter({sortList: [[0,0]]}); //sort table
      $("#main_table").colorize({hiliteColor: '#CFCFCF'});
    };
    
    return VenueDriver;
  })();
  $(function() {
    var venuedriver;
    venuedriver = new VenueDriver;
    return console.log(venuedriver.start());
  });
}).call(this);
