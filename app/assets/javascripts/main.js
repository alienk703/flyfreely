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
     var airportArray = ['BHM','ANC','PHX','LIT','LAX','SFO','DEN','BDL','MIA','MCO','TPA','ATL','HNL','BOI','ORD','IND','DSM','ICT','SDF','MSY','PWM','BWI','BOS','DTW','MSP','JAN','STL','BZN','OMA','LAS','MHT','EWR','ABQ','JFK','LGA','CLT','RDU','FAR','CLE','CMH','OKC','TUL','PDX','PHL','PIT','PVD','CHS','CAE','GSP','MYR','FSD','MEM','BNA','AUS','DAL','ELP','IAH','HOU','SAT','SLC','BTV','IAD','DCA','SEA','CRW','MKE','JAC','SJU']
     var airport = airportArray[Math.floor(Math.random()*airportArray.length)];

    self = this

    var htmlString = "<p>Results: </p><ul>";
    $.ajax({
      url: 'https://www.googleapis.com/qpxExpress/v1/trips/search?fields=trips&key=AIzaSyBFA3QnRcB-HKcCnCA_3dEjtAYln3zGXBU',
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(
        { 'request': {
          'passengers': {
            "kind": "qpxexpress#passengerCounts",
            "adultCount": passenger
          },
          'slice': [
            {
              "kind": "qpxexpress#sliceInput",
              "origin": departure,
              "destination": airport,
              "date": depdate,
              "maxStops": 0
            },
            {
              "kind": "qpxexpress#sliceInput",
              "origin": airport,
              "destination": departure,
              "date": arrdate,
              "maxStops": 0,
            }
          ],
          'maxPrice': budget.to_s,
          'solutions': 100
          }
        }
      ),
      success: function(data){
        var self = this;
        console.log(data);
        console.log("something");

        for (var i = 0; i < data.trips.data.carrier.length; i ++)
        for (var x = 0; x < data.trips.tripOption.length; x ++){

          var destin = data.trips.data.city[0].name;
          var carrier = data.trips.data.carrier[i].name;
          var price = data.trips.tripOption[x].saleTotal;

          htmlString += '<li>' + destin + ':' + carrier + ":"  + price + "<li>";
          htmlString += "</ul>";
          self.render(htmlString);
        }
      },

        render: function(htmlString){
          this.clearResults();

          $(".results").append(htmlString)

        },

        clearResults: function(){
          $(".results").html("");
        },
      
      // },

      failure: function(){
        console.log("Fuck me :(");
      }

    });
  });
}


$(document).ready(function(){
    flightSearch();
});