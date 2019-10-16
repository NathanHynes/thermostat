$(document).ready(function() {
  $('#header').text('ThermoBot');
  var thermostat = new Thermostat();
  updateTemperature();

  $("#temperature-up").click(function(){
    thermostat.up();
    updateTemperature();
  });

  $("#temperature-down").click(function(){
    thermostat.down();
    updateTemperature();
  });

  $("#temperature-reset").click(function(){
    $("#feedback").fadeIn( "slow" );
    $('#feedback').text('ThermoBot reset');
    $("#feedback").fadeOut( "slow" );
    thermostat.reset();
    updateTemperature();
  });

  $("#eco").click(function(){
    if (thermostat.isPowerSavingModeOn()=== true) {
      thermostat.switchOffPowerSaving();
      $("#feedback").fadeIn( "slow" );
      $('#feedback').text('Power Saving Mode off');
      $("#feedback").fadeOut( "slow" );
    }else {
      thermostat.switchOnPowerSaving();
      $("#feedback").fadeIn( "slow" );
      $('#feedback').text('Power Saving Mode on');
      $("#feedback").fadeOut( "slow" );
    }
    updateTemperature();
  });


  function updateTemperature() {
  $('#energy').text(thermostat.energyStatus());
  $('#temperature').text(thermostat.temperature);
  $('#temperature').attr('class', thermostat.energyStatus());
  $('#energy').attr('class', thermostat.energyStatus());
}
})
