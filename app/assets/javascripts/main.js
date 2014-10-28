$(function() {
  $( "#datepicker" ).datepicker({dateFormat: "yy-mm-dd"});
});

$(function() {
  $( ".datepicker" ).datepicker({dateFormat: "yy-mm-dd"});
});


var Finder = {

  initialize: function(){

    var self = this;
    $("form").on('submit', function(event){
      event.preventDefault();

      self.departure = $("#departure").val();
      self.arrival = $("#arrival").val();
      self.depdate = $("#datepicker").val();
      self.arrdate = $(".datepicker").val();
      self.budget = $("#budget").val();
      self.getDestination();     
    });
  },
  getDestination: function(){
        console.log("get dest");

     var departure = $("#departure").val();
     var arrival = $("#arrival").val();
     var depdate = $("#datepicker").val();
     var passenger = $(".passenger").val();
     var budget = $("#budget").val();


    self = this
    // results
    var htmlString = "<p>Results: </p><ul>";
    $.ajax({
      url: "https://www.googleapis.com/qpxExpress/v1/trips/search?fields=trips&key=AIzaSyCtvfwSNDdpQS3PCIoLnJRVcQsMDOGXMa0",
      dataType: "application/json",
      contentType: 'application/json',
      data: JSON.stringify(
        {
          "request": {
            "maxPrice": budget.to_s,
            "slice": [
              {
                "origin": departure,
                "destination": arrival,
                "date": depdate
              }
            ],
            "passengers": {
                 "adultCount": passenger,
              // "infantInLapCount": 0,
              // "infantInSeatCount": 0,
              // "childCount": 0,
              // "seniorCount": 0
            },
             "solutions": 50,
            // "refundable": false
          }
        }
      ),
      method: "POST",

      success: function(data){
        console.log(data);
        console.log("something");

        htmlString += "<li>" + results + "</li>";
        htmlString += "</ul>";
        self.render(htmlString);
      },

      clearData: function(){
        $(".results").html("");
      },

      failure: function(){
        console.log("Fuck me :(");
      },
      done: function(){
        colsole.log("done");
      }
    });
  }
}

   function render(htmlString){
        this.clearResults();
        $(".results").append(htmlString)
      }


$(document).ready(function(){
  Finder.initialize();
});