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


 /*
** 时间戳转换成指定格式日期
** eg. 
** dateFormat(11111111111111, 'Y年m月d日 H时i分')
** → "2322年02月06日 03时45分"
*/
export function formatDate(timestamp, formats) {
    // formats格式包括
    // 1. Y-m-d
    // 2. Y-m-d H:i:s
    // 3. Y年m月d日
    // 4. Y年m月d日 H时i分
    formats = formats || 'Y-m-d';

    var zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };

    var myDate = timestamp? new Date(timestamp): new Date();

    var year = myDate.getFullYear();
    var month = zero(myDate.getMonth() + 1);
    var day = zero(myDate.getDate());

    var hour = zero(myDate.getHours());
    var minite = zero(myDate.getMinutes());
    var second = zero(myDate.getSeconds());

    return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
        return ({
            Y: year,
            m: month,
            d: day,
            H: hour,
            i: minite,
            s: second
        })[matches];
    });
};



