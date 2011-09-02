
class VenueDriver
  @API_USERNAME = "ivanacostarubio"
  @API_PASSWORD = "letmein"
  @VENUE_URL = "http://venuedriver.com/api/accounts/44/venues.json?username=" + @API_USERNAME + "&password=" + @API_PASSWORD + "&callback=?"
  @venues_list = new Array()

  venues: -> 
    $.getJSON VenueDriver.VENUE_URL, (data) ->
      $("#loading").css('display','')
      $.each data, (i,item) ->
        VenueDriver.events(item)
        if i == (data.length - 1)
          $("#loading").css('display','none')
      
  @events: (venue) ->
    $.ajax({
      url: "http://venuedriver.com/api/venues/" + venue.id + "/events.json?username=" + @API_USERNAME + "&password=" + @API_PASSWORD + "&callback=?",
      dataType: 'jsonp',
      cache: true,
      success: (data) ->
        $.each data, (i,item) ->
          table_data = "<div id='selectevent_eventitem'><table width='100%' height='49px' cellspacing='0' cellpadding='0'><tr>
                  <td width='92' class='eventitem_text'>" + item.date + "</td>
                  <td width='136' calss='eventitem_text'>" + venue.city + ", " + venue.state + "</td>
                  <td width='130' class='eventitem_text'>" + venue.title + "</td>
                  <td class='eventitem_text'>" + item.title + "</td>
                  <td align='right'><a href='" + venue.home_URL + "/buy/tickets/event/" + item.id + "'>Buy</a></td>
                  </tr></table></div>"
          $('#wrapper').append table_data
    })
    return true

        

$ ->
  venuedriver = new VenueDriver
  console.log venuedriver.venues()



