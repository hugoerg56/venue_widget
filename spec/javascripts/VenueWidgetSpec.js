describe("VenueWidget", function() {

  beforeEach(function() {
    loadFixtures("main_table.html");
  });

  it("I should have a table", function() {
    expect($("#main_table")).toExist();
  });
  
  it("I should have a object named VenueDriver", function() {
    obj = new VenueDriver;
    $.type(obj.start)
    expect($.type(obj.start)).toEqual("function");
  });

 
});