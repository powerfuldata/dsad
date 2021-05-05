function A(){}
A.prototype = {s: {n:20}}
const a = new A()
a.s.n = 50;
console.log(A.prototype.s)// 50


function B(){}
B.prototype = {s: 100}
const b = new B()
b.s = 21
console.log(B.prototype.s)// 100