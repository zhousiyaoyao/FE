function setname(obj){
    obj.name = "1"
    var obj = new Object()
    obj.name = "2"
}
var person = new Object()
setname(person)
alert(person.name)