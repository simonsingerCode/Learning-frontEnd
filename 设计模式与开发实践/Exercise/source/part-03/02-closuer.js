// var appendDiv = function (callback) {
//   for (let i = 0; i < 100; i++) {
//     var div = document.createElement('div');
//     div.innerHTML = i+1;
//     document.body.appendChild(div);
//     // div.style.display = 'none';
//     if (typeof callback === 'function') {
//       callback(div);
//     }
//   }
// }

// document.getElementById('execute').onclick = function () {
//   appendDiv(function (node) {
//     node.style.display = 'none';
//   });
// }



let ary = [1, 4, 3, 2, 9, 5];
let ary2 = ary.sort(function (a, b) {
  return a - b;
});

console.log(ary2);
