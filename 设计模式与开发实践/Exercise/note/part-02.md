# this、call、apply

## 1. this 总是指向一个对象，具体指那个对象实在运行时基于函数的执行环境动态绑定的，而非函数声明时的环境
---

## 2. this 的指向问题
  - 作为对象的方法调用
  - 作为普通函数调用
  - 构造器调用
  - Function.prototype.call 或 Function.prototype.apply 调用

### 2.1 作为对象方法调用
  - 当函数作为对象的方法调用时，this 指向该对象
      ```js
      // 1. 作为对象方法调用
      var obj = {
        a: 1,
        getA: function(){
          console.log(this === obj);
          console.log(this.a);
        }
      };
      obj.getA();
      ```

### 2.2 作为普通函数调用
  - 有时候为了保证当前 this ，我们可以用一个变量，临时存储当前this
  ```js
  window.id = 'window';
  document.getElementById('div1').onclick = function(){
    console.log(this.id);

    // 为保证当前的 this 指向 div 我们可以把当前的 this 保存下来
    var that = this;
    var callback = function(){
      console.log(that.id);
    };
    callback();
  }
  ```

### 2.3 作为构造器使用
  - 使用 new 运算符调用函数时，该函数总是返回一个对象，构造器里面的this就指向返回的这个对象
      ```js
      var MyClass = function(){
        this.name = 'sven';
      };
      var obj = new MyClass();
      console.log(obj.name); // sven
      ```
  - > **`如果构造器显式的返回了一个 object 类型的对象，那么此次运算的记过最终是返回的是这个显式的 object 类型的对象`; 如果构造器不显式地返回任何数据，或者是返回一个非对象类型的数据，就不会出现上述这种情况**
      ```js
      var MyClass = function(){
      this.name = 'sven';
      return {
        name: 'anne'
      }
    };
    var obj = new MyClass();
    console.log(obj.name); // anne
      ```

### 2.4 `Function.prototype.call` 或 `Function.prototype.apply` 调用
  - 在实际项目使用过程中 如果从第二个参数开始，有 3 个以上的参数的话，使用 apply 比较好，如果小于 3 个使用 call
---

## 3. call 和 apply 的用途
  - 改变 this 指向
  - 模拟原生 bind； `Function.prototype.bind`
      ```js
      Function.prototype.bind = function(context){
        // 保存原函数中的this
        var self = this;
        // 返回一个新的函数
        return function(){
          // 执行新的函数的时候，会把之前传入的 context 当作新函数体内的 this
          return self.apply(context, arguments);
        }
      };

      var obj = {
        name: 'sven'
      };
      var func = function(){
        console.log(this.name);
      }.bind(obj);
      func()


      Function.prototype.bind = function(){
        var self = this; // 保存原函数
        // 需要绑定的this上下文
        context = [].shift.call(arguments);
        // 将剩余参数转换成数组
        args = [].slice.call(arguments)
        // 返回一个新的函数
        return function(){
          // 执行新的函数的时候，会把之前传入的 context 当作新函数体内的 this
          // 并且组合两次分别传入的参数，作为新函数的参数
          return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
        }
      };
      var obj = {
        name: 'sven'
      };
      var func = function(a,b,c,d){
        console.log(this.name);
        console.log([a,b,c,d]);
      }.bind(obj,1,2);
      func(3,4);
      ```
  - 借用其他对象的方法
      - 借用构造函数实现类似继承效果
          ```js
          var A = function(name){
            this.name = name;
          };
          var B = function(){
            A.apply(this, arguments);
          };

          B.prototype.getName = function(){
            return this.name;
          };

          var b = new B('seven');
          console.log(b.getName());
          ```
      - 本身不具备，但是借用其他具备此功能的方法，来实现。函数中的 arguments 是一个类数组，但是可以借助于数组的方法，实现向 arguments 中添加元素
          ```js
          (function(){
            Array.prototype.push.call(arguments, 3);
            console.log(arguments);
          })(1,2);
          ```
