$(function() {
  $( "#datepicker" ).datepicker({dateFormat: "yy-mm-dd"});
});

$(function() {
  $( ".datepicker" ).datepicker({dateFormat: "yy-mm-dd"});
});


// var Finder = {

function flightSearch(){

  var self = this;
    $("form").on('submit', function(event){
      event.preventDefault();

      self.departure = $("#departure").val();
      self.arrival = $("#arrival").val();
      self.depdate = $("#datepicker").val();
      self.arrdate = $(".datepicker").val();
      self.budget = $("#budget").val();
      console.log("get dest");

     var departure = $("#departure").val();
     var arrival = $("#arrival").val();
     var depdate = $("#datepicker").val();
     var arrdate = $(".datepicker").val();
     var passenger = $(".passenger").val();
     var budget = $("#budget").val();

    self = this

    var htmlString = "<p>Results: </p><ul>";
    $.ajax({
      url: 'https://www.googleapis.com/qpxExpress/v1/trips/search?fields=trips&key=AIzaSyCtvfwSNDdpQS3PCIoLnJRVcQsMDOGXMa0',
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(
        { 'request': {
          'maxPrice': budget.to_s,
          'passengers': {
            "kind": "qpxexpress#passengerCounts",
            "adultCount": passenger
          },
          'slice': [
            {
              "kind": "qpxexpress#sliceInput",
              "origin": departure,
              "destination": arrival,
              "date": depdate,
              "maxStops": 0
            },
            {
              "kind": "qpxexpress#sliceInput",
              "origin": arrival,
              "destination": departure,
              "date": arrdate,
              "maxStops": 0,
            }
          ],
          'maxPrice': budget.to_s,
          'solutions': 50
          }
        }
      ),
      success: function(data){
        console.log(data);
        console.log("something");
      },

      // clearData: function(){
      //   $(".results").html("");
      // },

      failure: function(){
        console.log("Fuck me :(");
      },
    });
  });
}


   function render(htmlString){
        this.clearResults();
        $(".results").append(htmlString)
      }


$(document).ready(function(){
    flightSearch();
});