# 闭包和高阶函数
## 1. 闭包
  - 闭包的形成和变量的作用域以及变量的生存周期密切相关。
      - 变量的作用域：指的是变量的有效范围

  - 闭包的作用：
      1. 封装变量
          ```js
          // => 加入缓存机制
          var mult = (function () {
            var cache = {};
            return function () {
              var args = Array.prototype.join.call(arguments, ',');
              if (args in cache) {
                return cache[args];
              }
              var a = 1;
              for (var i = 0, l = arguments.length; i < l; i++) {
                a = a * arguments[i];
              }
              return cache[args] = a;
            }
          })();
          console.log(mult(1,2,3));
          console.log(mult(1,2,3));
          ```
      2. 提炼函数是代码重构中的一种常见技巧。如果在一个大函数中有一些代码块能够独立出来，我们常常把这些代码块封装在独立的小函数里面。独立出来的小函数有助于代码服用，如果小函数有一个良好的命名，他们本身起到了注释的作用。如果小函数没有在程序的其他地方使用，最好把他们用闭包封闭起来。
          ```js
          var mult = (function () {
            var cache = {};
            // 封闭 caclulate 函数
            var calculate = function () {
              var a = 1;
              for (let i = 0, l = arguments.length; i < l; i++) {
                a = a * arguments[i];
              }
              return a;
            };

            return function () {
              var args = Array.prototype.join.call(arguments, ',');
              if (args in cache) {
                return cache[args];
              }
              return cache[args] = caclulate.apply(null, arguments);
            }
          })();
          ```

      3. 延续局部变量的寿命
          ```js
          var report = function (src) {
            var img = new Image();
            img.src = src;
          }
          report('http:www.baidu.com/getUserInfo');
          // 通过查询后台的记录我们得知，因为一些低版本浏览器的实现存在bug，在这些浏览器
          // 下使用report 函数进行数据上报会丢失30 % 左右的数据，也就是说，report 函数并不是每一次
          // 都成功发起了HTTP 请求。丢失数据的原因是img 是report 函数中的局部变量，当report 函数的
          // 调用结束后，img 局部变量随即被销毁，而此时或许还没来得及发出HTTP 请求，所以此次请求
          // 就会丢失掉。
          // 现在我们把img 变量用闭包封闭起来，便能解决请求丢失的问题：
          var report = (function () {
            var imgs = [];
            return function (src) {
              var img = new Image();
              imgs.push(img);
              img.src = src;
            }
          })();
          ```
---

## 2. 闭包和面向对象设计
  - 过程和数据的结合是形容面向对象中的‘对象’时，经常使用的表达。
  - 对象以方法的形式 包含了过程，而闭包则是在过程中以环境的形式包含了数据。通常用面相对象的思想能实现的功能，用闭包也能实现。反之亦然。
      ```js
      var extent = function () {
        var value = 0;
        return {
          call: function() {
            value++;
            console.log(value);
          }
        }
      };
      var extent = extent();
      extent.call();
      extent.call();
      extent.call();

      // => 如果换成面向对象
      var extnet = {
        value: 0,
        call: function () {
          this.value++;
          console.log(this.value);
        }
      };
      extent.call();
      extent.call();
      extent.call();

      // 或者
      var Extent = function () {
        this.value = 0;
      }
      Extent.prototype.call = function () {
        this.value++;
        console.log(this.value);
      };

      var extent = new Extent();
      extent.call();
      extent.call();
      extent.call();
      ```
---

## 3. 用闭包实现命令模式
  - 各种设计模式中，闭包的应用非常广泛。
  - 先用面向对象的方式编写一段命令模式的代码。
      ```js
      var Tv = {
        open: function(){
          console.log('打开电视机...');
        },
        close: function(){
          console.log('关上电视机...');
        }
      };
      var OpenTvCommand = function(receiver){
        this.receiver = receiver;
      };

      OpenTvCommand.prototype.execute = function(){
        this.receiver.open(); // 执行命令，打开电视机
      };
      OpenTvCommand.prototype.undo = function(){
        this.receiver.close(); // 执行命令，关闭电视机
      };

      var setCommadn = function(command){
        document.getElementById('execute').onclick = function(){
          command.execute(); // 输出：打开电视
        },
        document.getElementById('undo').onclick = function(){
          command.undo();
        }
      };
      setCommadn(new OpenTvCommand(Tv));
      ```
      > 以上代码解析
      1. 命令模式的意图，把请求封装为对象，从而分离请求的发起者和请求的接受者之间的耦合关系。在命令执行前，可以预先往命令对象中植入命令的接受者。
      2. 在JS 中，函数作为一等对象，本身就可以四处传递，用函数对象而不是普通对象来封装请求显得更加简单和自然。如果往函数对象中预先植入命令的接收者，那么闭包可以完成这个工作。
      3. 在面向对象版本的命令模式中，预先植入的命令接收者被当成对象的属性保存起来；而在闭包版本的命令模式中，命令接收者会被i封闭在闭包形成的环境中。代码如下:
          ```js
          var Tv = {
            open: function(){
              console.log('打开电视...');
            },
            close: function(){
              console.log('关上电视...');
            }
          };

          var createCommand = function(receiver){
            var execute = function(){
              return receiver.open(); // 执行命令，打开电视
            }

            var undo = function(){
              return receiver.close(); // 执行命令，关闭电视
            }

            return {
              execute: execute,
              undo: undo
            }
          };

          var setCommand = function(command){
            document.getElementById('execute').onclick = function(){
              command.execute(); // 输出：打开电视机
            }
            document.getElementById('undo').onclick = function(){
              command.undo(); // 输出：关闭电视
            }
          };
          setCommand(createCommand(Tv));
          ```
---

## 4. 闭包与内存管理
  - 局部变量本来应该在函数退出的时候被解除引用，但如果局部变量被封装在闭包形成的环境中，那么这个局部变量就能一直生存下去。从这种意义上说，闭包的确会使一些数据无法被及时销毁。
  - 使用闭包的一部分原因是我们主动把一些变量封闭在闭包中，因为可能在以后还需要使用这些变量，把这些变量放在闭包中和放在全局作用域，对内存方面的影响是一致的。如果将来需要回收这些变量，我们可以手动把这些变量设置为null
  - 闭包和内存泄漏有关系的地方：是用闭包的同时容易形成循环引用，如果闭包的作用域链中保存着一些DOM节点，这时候有可能会造成内存泄漏。接着这个问题，只需要我们手动的把循环引用的变量设置为null即可。
---

# 高阶函数

## 高阶函数至少满足下列条件之一
  - 函数作为参数被传递
  - 函数作为返回值输出
---

## 1. 函数作为参数传递
  - 函数作为参数，意味着，我们可以抽离出一部分容易变化的业务逻辑，把这部分业务逻辑放在函数参数中，这样就可以分离业务逻辑代码中变化和不变的部分。其中的场景就是常见的回调函数。
  - 回调函数
    - ajax 的异步请求应用中，回调函数的使用非常频繁。
