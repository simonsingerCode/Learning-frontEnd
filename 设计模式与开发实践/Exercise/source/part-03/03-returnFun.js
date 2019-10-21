// var isString = function (obj) {
//   return Object.prototype.toString.call(obj);
// }

// var isArray = function (obj) {
//   return Object.prototype.toString.call(obj);
// };

// var isNumber = function (obj) {
//   return Object.prototype.toString.call(obj);
// }


// var isType = function (type) {
//   return function (obj) {
//     return Object.prototype.toString.call(obj) === '[object ' + type + ']';
//   }
// }

// var isString = isType('String');
// console.log(isString('simon'));
// var isArray = isType('Array');
// console.log(isArray([1,2,3]));


// 使用循环语句，来批量注册这些函数
// var Type = {};
// for (let i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
//   (function (type) {
//     Type['is' + type] = function (obj) {
//       return Object.prototype.toString.call(obj) === '[object ' + type + ']';
//     }
//   })(type);
// }

// console.log(Type.isArray([]));
// console.log(Type.isString('str'));



// getSingle 单例模式
// var getSingle = function (fn) {
//   var ret;
//   return function () {
//     return ret || (ret = fn.apply(this, arguments));
//   }
// }

// var getScript = getSingle(function () {
//   return document.createElement('script');
// })

// var script1 = getScript();
// var script2 = getScript();
// console.log(script1 === script2);



// Function.prototype.before = function (beforefn) {
//   var _self = this; // 保存原来函数的引用
//   return function () {  // 返回包含了原函数和新函数的'代理'函数
//     beforefn.apply(this, arguments); // 执行新函数，修正 this
//     return _self.apply(this, arguments); // 执行原函数
//   };
// };

// Function.prototype.after = function (afterfn) {
//   var _self = this;
//   return function () {
//     var ret = _self.apply(this, arguments);
//     afterfn.apply(this, arguments);
//     return ret;
//   }
// }

// var func = function () {
//   console.log(2);
// };
// func = func.before(function () {
//   console.log(1);
// }).after(function () {
//   console.log(3);
// });

// func();


// var monthlyCost = 0;
// var cost = function (money) {
//   monthlyCost += money;
// }

// console.log(cost(100));
// console.log(cost(200));
// console.log(cost(300));
// console.log(cost(700));
// console.log(monthlyCost);


// var cost = (function () {
//   var args = [];
//   return function () {
//     if (arguments.length === 0) {
//       var money = 0;
//       for (var i = 0, l = args.length; i < l; i++) {
//         money += args[i];
//       }
//       return money;
//     } else {
//       [].push.apply(args, arguments);
//     }
//   }
// })();

// cost(100);
// cost(200);
// cost(300);
// console.log(cost());


// var currying = function (fn) {
//   var args = [];
//   return function () {
//     if (arguments.length === 0) {
//       return fn.apply(this, args);
//     } else {
//       [].push.apply(args, arguments);
//       return arguments.callee;
//     }
//   }
// };

// var cost = (function () {
//   var money = 0;
//   return function () {
//     for (var i = 0, len = arguments.length; i < len; i++) {
//       money += arguments[i];
//     }
//     return money;
//   }
// })();

// var cost = currying(cost);
// cost(100);
// cost(200);
// cost(300);
// console.log(cost());


Function.prototype.uncurrying = function () {
  var self = this;
  return function () {
    var obj = Array.prototype.shift.call(arguments);
    return self.apply(obj, arguments);
  }
}
