# 面向对象的 javascript

## 1. 编程语言分类
  - 按照数据类型分为： 静态类型语言和动态类型语言
  - 静态类型语言：
      - 静态类型语言在编译时已经确定变量的类型
      - 优点：
          - 编译时就能发现类型不匹配，编译器提前帮我们检查错误
          - 提高执行效率

  - 动态类型语言：
      - 动态类型语言在运行时，变量被赋予某个值之后，才会具有某种类型
      - 优点：
          - 编写代码少
          - 动态类型语言对变量类型的宽容给实际代码带来了很大灵活性，可以给变量赋予任意类型值

  - 鸭子类型思想：**某种动物能否发声，只取决于有没有某种方法，而不是取决于它是否是某种类型的对象，不存在任何程度上的 `类型耦合`**
---

## 2. 多态
  > ### 含义：
  - 同一操作，根据传入的参数或类型的不同，分别给出不同的反馈，就成为多态
  - 多态背后的思想：
      - `做什么` 和 `谁去做以及怎样做` 分离开来， 也就是将 `不变的事物` 与 `可能变的事物` 分离开来；
      - 把不变的分离开来，把可变的部分封装起来，这对于程序的扩展是非常有帮助的

  > ### 2.1 对象的多态性
  - 使用继承得到多态效果，是让对象表现出多态性的最常用手段。
  - 继承包括： 实现继承 和 接口继承
  - 多态在面向对象中的作用： **通过把过程化的条件分支语句转化为对象的多态性**。
  - **面向对象设计的优点：** 将行为分布在各个对象中，并让这些对象各自负责自己的行为
  - 面向对象的封装： 是将 `做什么(renderMap)`，和 `谁去做(googleMap / baiduMap)` 分开封装的。
      ```js
       var googleMap = {
          show(){
            console.log('开始渲染谷歌地图...');
          }
        };
        var baiduMap = {
          show(){
            console.log('开始渲染百度地图...');
          }
        };
        var renderMap = function (type) {
          if(type === 'google'){
            googleMap.show();
          }else if(type === 'baidu'){
            baiduMap.show();
          }
        }
        renderMap('google');
        renderMap('baidu');
        // 面向对象的封装： 是将 做什么(renderMap)，和 谁去做(googleMap / baiduMap)分开封装的。
        // => 仔细观察下面的封装和上面封装的多态的区别：

        var renderMap = function(map){
          if(map.show instanceof Function){
            map.show();
          }
        };
        renderMap(googleMap);  // 此方式也可称为简单的 **高阶函数**
        renderMap(baiduMap);
      ```
---

  > ## 2.2 封装
  ## 1. 封装的目的：就是将信息隐藏
  - 封装的几种类型：
      0. 封装是任何类型的封装，不仅仅 `隐藏数据`，还包括 `隐藏细节`，`设计细节`，`隐藏对象的类型`

      1. 封装数据
          - JS中的数据封装，没有想其他语言那样，由语法解析实现，提供了 `private  public  protected` 等关键字；我们只能依赖 `变量的作用域来实现封装`，只能模拟 `public` 和 `private`这两种特性
          - 从封装的实现细节来讲，封装使得对象内部的变化对其他对象而言是不可见的。对象只对他自己的行为负责。其他对象或者用户都不关系它的内部实现。封装使得对象之间的耦合变得松散，对象之间只能通过暴露的 API 接口来实现通信。

      2. 封装类型
          - 封装类型是静态语言中一种重要的封装方式。一般是通过 `抽象类和接口来进行的`。

      3. 封装变化
          - 封装在更重要的层面体现为：`封装变化`
          - 通过封装变化的方式，把系统中稳定不变的部分和容易变化的部分分离开来，在系统的演变过程中，我们需要替换那些容易变化的部分，如果这些部分是封装好的，替换起来也比较容易。
---

## 原型模式和基于原型继承的JavaScript对象系统
  - 以 **类** 为中心的面向对象语言中，类和对象的关系：铸模与铸件的关系，对象总是从类中创建而来。

  > ## 原型模式
  1. > 使用克隆的原型模式：先找到一个对象，然后通过克隆一个一模一样的对象。
  2. > ES5 中提供了一个 `Object.create()` 方法，用来克隆对象
      ```js
      // ES5中 Object.create()
      var Plane = function(){
        this.blood = 100;
        this.attackLevel = 1;
        this.defenseLevel = 1;
      };
      var plane = new Plane();
      plane.boold = 500;
      plane.attackLevel = 10;
      plane.defenseLevel = 7;

      var clonePlane = Object.create(plane);
      console.log(clonePlane);

      // 如果不支持 Object.create()
      Object.create= Object.create || function(obj){
        var F = function(){};
        F.prototype = obj;
        return new F();
      }
      ```

  3. > 克隆是创建对象的手段
      - 原型对象的真正目的并非在于，需要创建一个一模一样的对象，而是提供了一种便捷的方法创建某个类性的对象，克隆只是创建这个对象的过程和手段。
      - JavaScript 中对象，都是从某个对象上克隆出来的。
      - `原型继承的本质：基于原型链的委托机制实现的`
      - 原型编程范型的基本规则：
          - 所有的数据都是对象
          - 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它
          - 对象会记住它的原型
          - 如果对象无法响应某个请求，他会把这个请求委托给它自己的原型

  4. > JavaScript 中的原型继承
      - > 原型编程范型的基本规则解读
        1. 所有的数据都是对象
            - JavaScript中的跟对象是 `Object.prototype` 对象，此对象是一个空对象
                ```js
                var obj1 = new Object();
                var obj2 = {};

                console.log(Object.getPrototypeOf(obj1) === Object.prototype); // true
                console.log(Object.getPrototypeOf(obj2) === Object.prototype); // true
                ```
        2. 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它
            - 使用一个new 运算符从构造器中得到一个对象
            - 在JavaScript中的函数，既可以作为普通函数调用，也可以作为构造器使用。
                ```js
                function Person(name){
                  this.name = name;
                }
                Person.prototype.getName = function(){
                  return this.name;
                };

                var objectFactory = function(){
                  var obj = new Object(); // 从 Object.prototype 克隆一个空的对象
                  Constructor = [].shift.call(arguments); // 取得外部传入的构造器，此例是 Person
                  obj.__proto__ = Constructor.prototype; // 指向正确的原型
                  var ret = Constructor.apply(obj,arguments); // 借用外部传入的构造器给 obj 设置属性

                  return typeof ret === 'object' ? ret : obj;
                }

                var a = objectFactory(Person, 'sven');
                console.log(a.name);
                console.log(a.getName());
                console.log(Object.getPrototypeOf(a) === Person.prototype);
                ```
        3. 对象会记住它的原型
            - Javascript 中对象的原型，严格来说是：对象的构造器有原型。
