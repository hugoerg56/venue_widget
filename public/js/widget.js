var VenueDriver;
(function() {
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
        $.each(item.events, function(i, event){
          var table_data = "<tr class='eventitem_row'><td width='92' class='eventitem_text'>" + event.date + "</td>  <td width='136' calss='eventitem_text'>" + item.venue.city + ", " + item.venue.state +"</td>  <td width='130' class='eventitem_text'>" + item.venue.title + "</td>  <td class='eventitem_text'>" + event.title + "</td>  <td align='right'><a href='" + urlBuyBtton(event, item)  + "' target='_blank'>Buy</a></td></tr>";
          $('#main_table tbody').append(table_data);
        });
      });
      toggle_loading();
    };
    
    function toggle_loading(){
      $("#loading").toggle();
    }
    
    function urlBuyBtton(event, venue){
      if (event.tickets_URL == null){
        return "https://ticketdriver.com/" + venue.friendly_id + "/buy/tickets/event/" + event.id
      }else{
        return event.tickets_URL;
      }
    }
  
    
    return VenueDriver;
  })();
  $(function() {
    var venuedriver = new VenueDriver;
    return venuedriver.start();
  });
}).call(this);
