# 单例模式
  - 定义： 保证要给类只有一个实例，并提供一个访问它的全局访问点。

## 1. 实现单例模式
  - 实现思路：
      - 用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象
      - 代码：
        ```js
        var Singleton = function (name) {
          this.name = name;
        };
        Singleton.prototype.getName = function () {
          console.log(this.name);
        };
        Singleton.getInstance = (function () {
          var instance = null;
          return (name) => {
            if (!instance) {
              instance = new Singleton(name);
            }
            return instance;
          }
        })();
        var a = Singleton.getInstance('seve1');
        var b = Singleton.getInstance('seve2')
        console.log(a === b); // true
        ```
---

## 2. 透明的单例模式
