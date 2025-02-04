$(document).ready(function() {
  $('#header').text('ThermoBot');
  var thermostat = new Thermostat();

  $.get('http://localhost:9292/temperature', function(data) {
    console.log(data)
  obj = JSON.parse(data);

  thermostat.temperature = obj.temp;
  thermostat.powerSavingMode = obj.power;
  $('#temperature').text(thermostat.temperature);
});

  updateTemperature();
  displayWeather('london');


  $('#city-submit').on('click', function() {
    displayWeather($("#city").val());
  });


  $("#temperature-up").click(function() {
    thermostat.up();
    updateTemperature();
    sendState();
  });

  $("#temperature-down").click(function() {
    thermostat.down();
    updateTemperature();
    sendState();
  });

  $("#temperature-reset").click(function() {
    $("#feedback").fadeIn("slow");
    $('#feedback').text('ThermoBot reset');
    $("#feedback").fadeOut("slow");
    thermostat.reset();
    updateTemperature();
    sendState()
  });

  $("#eco").click(function() {
    if (thermostat.isPowerSavingModeOn() === true) {
      thermostat.switchOffPowerSaving();
      $("#feedback").fadeIn("slow");
      $('#feedback').text('Power Saving Mode off');
      $("#feedback").fadeOut("slow");
    } else {
      thermostat.switchOnPowerSaving();
      $("#feedback").fadeIn("slow");
      $('#feedback').text('Power Saving Mode on');
      $("#feedback").fadeOut("slow");
    }
    updateTemperature();
    // sendState()
  });


  function updateTemperature() {
    $('#energy').text(thermostat.energyStatus());
    $('#temperature').text(thermostat.temperature);
    $('#temperature').attr('class', thermostat.energyStatus());
    $('#energy').attr('class', thermostat.energyStatus());
  }

  function displayWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var appid = '&appid=a3d9eb01d4de82b9b8d0849ef604dbed';
    var unit = '&units=metric';
    $.get(url + appid + unit, function(data) {
      $('#current-weather').text(`${data.name}, ${data.sys.country}: ${data.main.temp}`);
    });
  }

  function sendState() {
    var data = {temperature: thermostat.temperature, power: thermostat.powerSavingMode};
    $.post('http://localhost:9292/receive', data);
  }
});
