
// => 下面就是把不变的分离出来
var makeSound = function (animal) {
  animal.sound();
};

// 然后把可变的部分封装起来
var Duck = function () { };
Duck.prototype.sound = function () {
  console.log('嘎嘎嘎...');
};

var Chicken = function () { };
Chicken.prototype.sound = function () {
  console.log('咯咯咯...');
}

makeSound(new Duck());
makeSound(new Chicken());

var Dog = function () { };
Dog.prototype.sound = function () {
  console.log('汪汪汪...');
}

makeSound(new Dog());
