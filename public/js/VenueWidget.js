var VenueDriver;
(function() {
  VenueDriver = (function() {
    function VenueDriver() {}

  	options = {
  		api_token: "NVJEZ3T8A861Q2",
      account: "93",  
      div_id: "body",
      autostart: true
  	}
  	
    try{
  	  params = {
  		  api_token: VenueConfig.api_token,
        account: VenueConfig.account,
        div_id: VenueConfig.div_id,
        autostart: VenueConfig.autostart
  	  };
  	}catch(e){
  	  params = {}
  	}

  	jQuery.extend(options, params);
  	
    $(function initialize(){
      VenueDriver.api_token = options.api_token;
      VenueDriver.account = options.account;
      VenueDriver.host = "venuedriver.com";
      options.div_id = "#" + options.div_id
      options.div_id = options.div_id.replace("#body", "body");
      VenueDriver.api_url = "http://" + VenueDriver.host + "/api/accounts/" + VenueDriver.account + "/all_events?token=" + VenueDriver.api_token + "&callback=?";
      VenueDriver.prepare_table();
    });
    
    VenueDriver.prototype.start = function(){
      if(options.autostart == true){
        $.getJSON(VenueDriver.api_url, function(data) { 
          VenueDriver.prototype.fill_table(data);
        });
      }
    };
    
    VenueDriver.prototype.fill_table = function(data) {
      $.each(data, function(i, item) {
        $.each(item.events, function(i, event){
          var table_data = "<tr class='eventitem_row'><td width='92' class='eventitem_text column1'>" + event.date + "</td>  <td width='136' class='eventitem_text column2'>" + item.venue.city + ", " + item.venue.state +"</td>  <td width='130' class='eventitem_text column3'>" + item.venue.title + "</td>  <td class='eventitem_text column4'>" + event.title + "</td>  <td class='column5' align='right'><a href='" + urlBuyBtton(event, item)  + "' target='_blank'>Buy</a></td></tr>";
          $('#venueWidgetMainTable tbody').append(table_data);
        });
      });
      toggle_loading();
    };
    
    VenueDriver.prepare_table = function(){
      $(options.div_id).append("<div id='loading'><img src='/images/ajax-loader.gif'/></div>")
      $(options.div_id).append("<table id='venueWidgetMainTable'><thead><tr></tr></thead><tbody></tbody></table>");
      $(options.div_id + " tr").append(
              "<th class='eventlist_columnlabels' width='10%'>Date</th>" +
              "<th class='eventlist_columnlabels' width='20%'>Location</th>" +
              "<th class='eventlist_columnlabels' width='30%'>Venue</th>" +
              "<th class='eventlist_columnlabels' width='30%'>Event</th>" +
              "<th class='eventlist_columnlabels' width='10%'></th>"
      );
    }
    
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
    try{
      var venuedriver = new VenueDriver;
      return venuedriver.start();
    }catch(e){
      console.log(e);
    }
  });
}).call(this);
