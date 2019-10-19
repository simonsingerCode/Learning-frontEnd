// var a = 1;
// var func1 = function () {
//   var b = 2;
//   var func2 = function () {
//     var c = 3;
//     console.log(b);
//     console.log(a);
//   }
//   func2();
//   console.log(c);
// }

// func1();


// var func = function () {
//   var a = 1;
//   console.log(a);
// };

// func();

// var func = function () {
//   var a = 1;
//   return function () {
//     a++;
//     console.log(a);
//   };
// }

// var f = func();
// f();
// f();
// f();
// f();



// var Type = {};
// for (var i = 0, type; type = ['String', 'Array', 'Number'][i++];){
//   (function (type) {
//     Type['is' + type] = function (obj) {
//       return Object.prototype.toString.call(obj) === '[object ' + type + ']';
//     }
//   })(type);
// }
// console.log(Type.isArray([]));
// console.log(Type.isString('str'));


// => 闭包用来：封装变量
// var mult = function () {
//   var a = 1;
//   for (var i = 0, l = arguments.length; i < l; i++) {
//     a = a * arguments[i];
//   }
//   return a;
// }
// console.log(mult(1,2,3,4));


// => 加入缓存机制
// var mult = (function () {
//   var cache = {};
//   var args = Array.prototype.join.call(arguments, ',');
//   if (cache[args]) {
//     return cache[args];
//   }

//   var a = 1;
//   for (var i = 0, l = arguments.length; i < l; i++) {
//     a = a * arguments[i];
//   }
//   return a;
// })();

// var mult = (function () {
//   var cache = {};
//   return function () {
//     var args = Array.prototype.join.call(arguments, ',');
//     if (args in cache) {
//       return cache[args];
//     }
//     var a = 1;
//     for (var i = 0, l = arguments.length; i < l; i++) {
//       a = a * arguments[i];
//     }
//     return cache[args] = a;
//   }
// })();
// console.time('A');
// console.log(mult(1,2,3));
// console.timeEnd('A');
// console.time('B');
// console.log(mult(1,2,3));
// console.timeEnd('B');



// var mult = (function () {
//   var cache = {};
//   // 封闭 caclulate 函数
//   var calculate = function () {
//     var a = 1;
//     for (let i = 0, l = arguments.length; i < l; i++) {
//       a = a * arguments[i];
//     }
//     return a;
//   };

//   return function () {
//     var args = Array.prototype.join.call(arguments, ',');
//     if (args in cache) {
//       return cache[args];
//     }
//     return cache[args] = caclulate.apply(null, arguments);
//   }
// })();




// var report = function (src) {
//   var img = new Image();
//   img.src = src;
// }
// report('http:www.baidu.com/getUserInfo');
// // 通过查询后台的记录我们得知，因为一些低版本浏览器的实现存在bug，在这些浏览器
// // 下使用report 函数进行数据上报会丢失30 % 左右的数据，也就是说，report 函数并不是每一次
// // 都成功发起了HTTP 请求。丢失数据的原因是img 是report 函数中的局部变量，当report 函数的
// // 调用结束后，img 局部变量随即被销毁，而此时或许还没来得及发出HTTP 请求，所以此次请求
// // 就会丢失掉。
// // 现在我们把img 变量用闭包封闭起来，便能解决请求丢失的问题：
// var report = (function () {
//   var imgs = [];
//   return function (src) {
//     var img = new Image();
//     imgs.push(img);
//     img.src = src;
//   }
// })();




// 使用闭包实现面向对象
// var extent = function () {
//   var value = 0;
//   return {
//     call: function() {
//       value++;
//       console.log(value);
//     }
//   }
// };
// var extent = extent();
// extent.call();
// extent.call();
// extent.call();

// // => 如果换成面向对象
// var extnet = {
//   value: 0,
//   call: function () {
//     this.value++;
//     console.log(this.value);
//   }
// };
// extent.call();
// extent.call();
// extent.call();

// // 或者
// var Extent = function () {
//   this.value = 0;
// }
// Extent.prototype.call = function () {
//   this.value++;
//   console.log(this.value);
// };

// var extent = new Extent();
// extent.call();
// extent.call();
// extent.call();

