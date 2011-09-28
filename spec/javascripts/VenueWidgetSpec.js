describe("VenueWidget", function() {

  beforeEach(function() {
    loadFixtures("main_table.html");
  });

  it("I should have a table", function() {
    expect($("#main_table").length).toEqual(1);
  });

 
});