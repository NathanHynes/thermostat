'use strict';

function Thermostat() {
  this.MAX_LIMIT_PSM_ON = 25;
  this.MEDIUM_ENERGY_USAGE_LIMIT = 18;
  this.MAX_LIMIT_PSM_OFF = 32;
  this.MINIMUM_TEMPERATURE = 10;
  this.DEFAULT_TEMPERATURE = 20;
  this.temperature = this.DEFAULT_TEMPERATURE;
  this.powerSavingMode = true;
}

Thermostat.prototype.up = function() {
  if (this.isMaximumTemperature()) {
    return;
  }
  this.temperature += 1;
};

Thermostat.prototype.down = function() {
  if (this.isMinimumTemperature()) {
    return;
  }
  this.temperature -= 1;
};

Thermostat.prototype.isMinimumTemperature = function() {
  return this.temperature === this.MINIMUM_TEMPERATURE;
};

Thermostat.prototype.isMaximumTemperature = function() {
  if (this.isPowerSavingModeOn()) {
    return this.temperature >= this.MAX_LIMIT_PSM_ON;
  }
  return this.temperature >= this.MAX_LIMIT_PSM_OFF;
};

Thermostat.prototype.getCurrentTemperature = function() {
  return this.temperature;
};

Thermostat.prototype.isPowerSavingModeOn = function () {
  return this.powerSavingMode === true;
};

Thermostat.prototype.switchOffPowerSaving = function () {
  this.powerSavingMode = false;
};

Thermostat.prototype.switchOnPowerSaving = function () {
  this.powerSavingMode = true;
  if (this.temperature > 25) {
    this.temperature = 25;
  }
};

Thermostat.prototype.reset = function () {
  this.temperature = this.DEFAULT_TEMPERATURE;
};

Thermostat.prototype.energyStatus = function () {
  if (this.temperature < this.MEDIUM_ENERGY_USAGE_LIMIT) {
    return 'low-usage';
  }
  if (this.temperature >= this.MEDIUM_ENERGY_USAGE_LIMIT && this.temperature <= this.MAX_LIMIT_PSM_ON) {
    return 'medium-usage';
  }
  return 'high-usage';
};
