function ListNode(val){
  this.val = val
  this.next = null
}

function solution1(head){
  var dummy = new ListNode(0)
  dummy.next = head
  var p = dummy
  
  return dummy.next
}

function display(head) {
  // Show all nodes over here
  while(head){
      console.log(head.val)
      head = head.next
  }
}

var head = new ListNode(1)
var node1 = new ListNode(1)
var node2 = new ListNode(2)
var node3 = new ListNode(3)
var node4 = new ListNode(3)
head.next = node1
node1.next = node2
node2.next = node3
node3.next = node4
display(solution1(head))