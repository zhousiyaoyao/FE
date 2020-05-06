var a = 10
var b = 20
function sum(){
    var a = 1
    var b = 2
    console.log(this.a + this.b)
}
var call = sum.bind({a: 30, b :40})
call()
new call()