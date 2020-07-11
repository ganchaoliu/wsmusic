export default {
    'Sequential':0,
    'Single':1,
    'random':2
}

export const TYPE={
  'Music':1,
  'Artist':100,
  'Album':10,
  'Video':1014,
  'Lyric':1006,
  'Song':1000,
  'Radio':1009,
  'User':1002
}

// 将整数转换成 时：分：秒的格式
export // 将整数转换成 时：分：秒的格式
function realFormatSecond(second) {
  var secondType = typeof second;

  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);

    var hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    var mimute = Math.floor(second / 60);
    second = second - mimute * 60;
    if (hours == 0) {
      return ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2);
    }
  } else {
    return "00:00";
  }
}


function Node(element){
  this.element = element
  this.next = null
}

export function History(){
  this.head = new Node('head')
  this.length = 0

  // let curr
  // while(curr = this.head.next!==null){
  //   yield curr
  //   curr=curr.next
  // }

}


History.prototype={
  find:function(item){
      let currentNode = this.head
      while(currentNode.element!=item){
          currentNode = currentNode.next
          if(currentNode==null){
              break
          }
      }
      return currentNode
  },
  insert:function(element,item){
      let newNode = new Node(element)
      let current = this.find(item)
      newNode.next = current.next
      current.next = newNode
      this.length++
  },
  push:function(element){
      let current = this.find(element)
      // let findEle = this.find(element)
      // console.log(findEle.element)
      if(current!==null){
          this.remove(element)
      }        
      let newNode = new Node(element)
      newNode.next = this.head.next
      this.head.next = newNode
      this.length++
  },
  display:function(){
      let currentNode = this.head
      while(!(currentNode.next==null)){
          console.log(currentNode.next.element)
          currentNode = currentNode.next
      }
  },
  findPrevious:function(item){
      let current = this.head
      while(current.next.element!==item&&current.next!==null){
          current = current.next
      } 
      return current
  },
  remove:function(item){
      let pre = this.findPrevious(item)
      let current = this.find(item)
      pre.next = current.next
      this.length--
  },
}





