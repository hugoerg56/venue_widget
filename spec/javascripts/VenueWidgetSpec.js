describe("VenueWidget Test Table & Data", function() {

  function setup(){
    test = new VenueDriver;
    test.fill_table(VenueConfig.testData);
  }
  
  function clean(){
    $("#venueWidgetMainTable").remove();
    $("#loading").remove();
  }

  it("column1 should have a date '2011/01/01'", function(){
    setup();
    expect($(".column1:first").html()).toEqual("2011/01/01");
  });
  
  it("column2 should have a location 'CityTest, T'", function(){
    expect($(".column2:first").html()).toEqual("CityTest, T");
  });
  
  it("column3 should have a venue name 'TestVenue'", function(){
    expect($(".column3:first").html()).toEqual("TestVenue");
  });

  it("column4 should have a event name 'TestEvent'", function(){
    expect($(".column4:first").html()).toEqual("TestEvent");
  });
  
  it("column5 should have a buy link 'http://localhost/TestURL' if there is a tickets_URL", function(){
    expect($(".column5:first a").attr('href')).toEqual("http://localhost/TestURL");
  });
  
  it("column5 should have a buy link ''https://ticketdriver.com/frindly_test_name/buy/tickets/event/2' if no tickets_URL", function(){
    expect($(".column5:last a").attr('href')).toEqual("https://ticketdriver.com/frindly_test_name/buy/tickets/event/2");
    clean();
  });
  
});


describe("VenueWidget Test Object", function() {

  it("I should have a object named VenueDriver", function() {
    obj = new VenueDriver;
    expect($.type(obj)).toEqual("object");
  });

  it("VenueDriver object should have a function named start", function() {
    obj = new VenueDriver;
    expect($.type(obj.start)).toEqual("function");
  });
  
  it("VenueDriver object should have a function named fill_table", function() {
    obj = new VenueDriver;
    expect($.type(obj.fill_table)).toEqual("function");
  });
    
});

