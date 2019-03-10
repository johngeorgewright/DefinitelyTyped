import Emitter from 'wildemitter';

type EmittingFruit = Emitter & Fruit;

// the example object we're making
class Fruit {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  test: (this: EmittingFruit) => void;
}

// Mix the emitter behaviour into Fruit
Emitter.mixin(Fruit);

// a function that emits an events when called
Fruit.prototype.test = function(this: EmittingFruit) {
  this.emit('test', this.name);
};

// set up some test fruits
const apple = new Fruit('apple');

(apple as EmittingFruit).on('*', (...args) => {
  // "*" handler called
});

(apple as EmittingFruit).on('te*', (...args) => {
  // "te*" handler called
});

(apple as EmittingFruit).on('test', (...args) => {
  // "test" handler called
});

// calling the method that emits events.
(apple as EmittingFruit).test();

// it should write the following the log:
/*
"test" handler called { '0': 'apple' }
"*" handler called { '0': 'test', '1': 'apple' }
"te*" handler called { '0': 'test', '1': 'apple' }
*/

// this will remove any handlers explicitly listening for 'test' events.
(apple as EmittingFruit).off('test');

// calling our method again would this time only call the two wildcard handlers
// producing the following output
/*
"*" handler called { '0': 'test', '1': 'apple' }
"te*" handler called { '0': 'test', '1': 'apple' }
*/

// grouped handlers example, we'll create another fruit
const orange = new Fruit('orange');

// In this case "today" is the name of the group.
// here we'll bind some handlers that all pass 'today'
// as the group name
(orange as EmittingFruit).on('test', 'today', () => {});
(orange as EmittingFruit).on('someOtherEvent', 'today', () => {});
(orange as EmittingFruit).on('*', 'today', () => {});

// we can now unbind all three of those handlers like this
(orange as EmittingFruit).releaseGroup('today');
