#!/usr/bin/env node

var sleep = require('sleep');

var rate  = 100000;

var openUnicorn = [
  "          /| ",
  " ~～～～~/ | ",
  "|       O  O ",
  "|         ∇ |",
  " ~~~~∪∪~~~∪∪ "
];
var closeUnicorn = [
  "          /| ",
  " ～～～～/ | ",
  "|       ⌒  ⌒ ",
  "|         ∇ |",
  " ~~∪∪~~~∪∪~~ "
]
var unicornWidth  = openUnicorn[0].length;
var termWidth     = process.stdout.columns;
var unicornOffset = (termWidth - unicornWidth) / 2
var colors = [160, 9, 148, 82, 33, 90];

function clear() {
  println('\033c');
}

function print(_) {
  process.stdout.write(_ || '');
}

function println(_) {
  console.log(_ || '');
}

function renderSpace(number) {
  for (var i = 0; i < number; i++) {
    print(" ");
  }
}

function pinkify(_) {
  return "\x1b[38;5;14m" + _ + "\x1b[0m";
}

function renderUnicorn(unicorn) {
  unicorn.forEach(function(line) {
    renderSpace(unicornOffset);

    println(pinkify(line));
  });
}

function rainbowify(str, index) {
  var color = colors[index];
  return "\x1b[38;5;" + color + "m" + str + "\x1b[0m";
}

function renderRainbow(counter) {
  for(var i = 0; i < 5; i++) {
    for(var j = 0; j < termWidth; j++) {
      _ = counter + j;
      if (_ % 2 === 0) {
        print(rainbowify('-', i));
      } else {
        print(rainbowify('_', i));
      }
    }
    println();
  }
}

function draw(counter) {
  _unicorn = (counter % 10 > 5)? openUnicorn : closeUnicorn;
  renderUnicorn(_unicorn);

  renderRainbow(counter);
}


var counter = 0;

while(true) {
  clear();

  draw(counter);
  counter++;

  println('Press Ctrl-C to exit...');

  sleep.usleep(rate);
}
