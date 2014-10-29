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
     var airportArray = ['BHM','ANC','PHX', 'LAX','SFO','DEN','BDL','MIA','MCO','ATL','HNL','ORD','IND','DSM','CVG','MSY','PWM','BWI','BOS','DTW','MSP','STL','OMA','LAS','EWR','ABQ','JFK','LGA','CLT','RDU','CLE','CMH','OKC','TUL','PDX','PHL','PIT','CHS','CAE','GSP','MYR','MEM','BNA','DAL','ELP','IAH','SAT','SLC','IAD','DCA','SEA','MKE','JAC','SJU']
     var airport = airportArray[Math.floor(Math.random()*airportArray.length)];

    self = this

    var htmlString = "<p>Why don't we take you to.... </p><ul>";
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
          // 'maxPrice': budget.to_s,
          'solutions': 10
          }
        }
      ),
      success: function(data){
        var self = this;
        console.log(data);
        console.log("something");

        for (var i = 0; i < data.trips.data.carrier.length; i ++) {
          var carrier = data.trips.data.carrier[i].name;
        }
        for (var x = 0; x < data.trips.tripOption.length; x ++) {
          var price = data.trips.tripOption[x].saleTotal;
          // console.log(data.trips.tripOption[x])

          for (var y = 0; y < data.trips.tripOption[x].slice.length; y++){
            // console.log(data.trips.tripOption[x].slice[y])

            for (var b=0; b < data.trips.tripOption[x].slice[y].segment[0].leg.length; b++){
              var aircraft = data.trips.tripOption[x].slice[y].segment[0].leg[b].aircraft;
              var arrivalTime = data.trips.tripOption[x].slice[y].segment[0].leg[b].arrivalTime;
              var departureTime = data.trips.tripOption[x].slice[y].segment[0].leg[b].departureTime
               htmlString += '<li>' + data.trips.data.city[0].name + ': ' + carrier + ' ' + aircraft + ', Price: ' + price + '</br> Depart:' + departureTime + '</br> Arrive: ' + arrivalTime + '<li></br>';
            }
          }
        }

  
        htmlString += "</ul>";
        self.render(htmlString); 
        console.log(htmlString);
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