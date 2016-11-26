# Sensors.js

Sensors.js is a parser for linux's `lm-sensors` package.

The module exports two functions,

## `sensors(function done(parsed, error))`
Will execute sensors, parse output and execute `done` with parsed data.
First argument in done will be empty when an error occurs.

## `parser(raw_output)`
Will parse `raw_output` and return parsed data.

## `sensorsInstalled(function done(installed))`
Checks if lm-sensors is installed

## Example

`var lm_sensors = require('sensors.js');
lm_sensors.sensors(function (data, error) {
    if (error) throw error;
    console.log(data);
});`

will output:

```javascript
{ 'adt7473-i2c-5-2e':
   { 'nouveau-0000:01:00.0-3':
      { in1: { type: 'voltage', name: 'in1', value: 2.99, min: 0, max: 2.99 },
        '+3.3V': { type: 'voltage', name: '+3.3V', value: 3.21, min: 0, max: 4.38 },
        fan1: { type: 'rpm', name: 'fan1', value: 766, min: 0 },
        fan2: { type: 'rpm', name: 'fan2', value: 0, min: 0 },
        fan3: { type: 'rpm', name: 'fan3', value: 0, min: 164 },
        fan4: { type: 'rpm', name: 'fan4', value: 0, min: 0 },
        temp1:
         { type: 'temperature',
           name: 'temp1',
           value: 65,
           low: 65,
           high: 85 },
        'Board Temp':
         { type: 'temperature',
           name: 'Board Temp',
           value: 59,
           low: 20,
           high: 60 },
        temp3:
         { type: 'temperature',
           name: 'temp3',
           value: 65,
           low: 80,
           high: 105 } } },
  'nouveau-pci-0100': { 'PCI adapter': { temp1: { type: 'temperature', name: 'temp1', value: 0, high: 95 } } },
  'coretemp-isa-0000':
   { 'ISA adapter':
      { 'Core 0': { type: 'temperature', name: 'Core 0', value: 61, high: 84 },
        'Core 1': { type: 'temperature', name: 'Core 1', value: 60, high: 84 },
        'Core 2': { type: 'temperature', name: 'Core 2', value: 57, high: 84 },
        'Core 3': { type: 'temperature', name: 'Core 3', value: 57, high: 84 } } },
  'it8718-isa-0290':
   { 'ISA adapter':
      { in0: { type: 'voltage', name: 'in0', value: 1.18, min: 4.05, max: 2.03 },
        in1: { type: 'voltage', name: 'in1', value: 1.82, min: 0, max: 4.08 },
        in2: { type: 'voltage', name: 'in2', value: 2.99, min: 0, max: 4.08 },
        in3: { type: 'voltage', name: 'in3', value: 2.98, min: 0, max: 4.08 },
        in4: { type: 'voltage', name: 'in4', value: 2.98, min: 0, max: 4.08 },
        in5: { type: 'voltage', name: 'in5', value: 0, min: 0, max: 4.08 },
        in6: { type: 'voltage', name: 'in6', value: 0.13, min: 0, max: 4.08 },
        in7: { type: 'voltage', name: 'in7', value: 2.9, min: 0, max: 4.08 },
        Vbat: { type: 'voltage', name: 'Vbat', value: 3.09 },
        fan1: { type: 'rpm', name: 'fan1', value: 1386, min: 10 },
        fan2: { type: 'rpm', name: 'fan2', value: 0, min: 10 },
        fan3: { type: 'rpm', name: 'fan3', value: 1326, min: 0 },
        temp1:
         { type: 'temperature',
           name: 'temp1',
           value: 64,
           low: -1,
           high: 127 },
        temp2:
         { type: 'temperature',
           name: 'temp2',
           value: -78,
           low: -3,
           high: -41 },
        temp3:
         { type: 'temperature',
           name: 'temp3',
           value: -35,
           low: -1,
           high: 127 },
        cpu0_vid: { type: 'voltage', name: 'cpu0_vid', value: 1.238 } } } }
```