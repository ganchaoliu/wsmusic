
function Node(element){
    this.element = element
    this.next = null
  }
  
export function History(){
    this.head = new Node('head')
    this.length = 0
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
    }
  }