// Doing类
class Doing {
    listItems = []

    constructor() {
        this.listItems = []
    }

    add(item) {
        this.listItems.push(item)
    }

    delete(item) {
        let index = this.listItems.indexOf(item)
        if (index === -1) return false
        this.listItems.splice(index, 1)
    }
}

// Done类
class Done {
    listItems = []

    constructor() {
        this.listItems = []
    }

    add(item) {
        this.listItems.push(item)
    }

    delete(item) {
        let index = this.listItems.indexOf(item)
        if (index === -1) return false
        this.listItems.splice(index, 1)
    }
}

// 初始化
let doingRun = new Doing()
let doneRun = new Done()

// 初始化第一个todo
if (localStorage.getItem('doing') || localStorage.getItem('done')) {
    doingRun.listItems = JSON.parse(localStorage.getItem('doing'))
    doneRun.listItems = JSON.parse(localStorage.getItem('done'))
} else {
    doingRun.add('🥰 Please enter your first ToDo')
}

// 获取对应列表DOM
let doingList = document.querySelector('.todo_doing_list')
let doneList = document.querySelector('.todo_done_list')

// 渲染列表
function reLoad() {
    // 渲染Doing列表
    let doingHtml = ''
    for (let index = 0; index < doingRun.listItems.length; index++) {
        doingHtml += `<div class="todo_doing_list_item">
                      <div class="doing_item_left">
                         <i class="iconfont icon-weixuanzhong"></i>
                         <span class="doing_item_text">${doingRun.listItems[index]}</span>
                      </div>
                      <i class="iconfont icon-delete doing_item_right"></i>
                  </div>`
    }
    if (doingHtml === '') {
        doingHtml = `<div class="imgEmpty"><img src="../images/empty.png" alt="No Doing Item"><div>No Doing Item</div></div>`
    }
    doingList.innerHTML = doingHtml
    // 渲染Done列表
    let doneHtml = ''
    for (let index = 0; index < doneRun.listItems.length; index++) {
        doneHtml += `<div class="todo_done_list_item">
                      <div class="done_item_left">
                         <i class="iconfont icon-xuanzhong"></i>
                         <span class="done_item_text">${doneRun.listItems[index]}</span>
                      </div>
                      <i class="iconfont icon-delete done_item_right"></i>
                  </div>`
    }
    if (doneHtml === '') {
        doneHtml = `<div class="imgEmpty"><img src="../images/empty.png" alt="No Done Item"><div>No Done Item</div></div>`
    }
    doneList.innerHTML = doneHtml
}

reLoad()

// 获取元素并遍历元素绑定事件
function reBindClick() {
    let doingClick = document.querySelectorAll('.doing_item_left')
    let doingDelete = document.querySelectorAll('.doing_item_right')
    let doingItem = document.querySelectorAll('.doing_item_text')
    let doneClick = document.querySelectorAll('.done_item_left')
    let doneDelete = document.querySelectorAll('.done_item_right')
    let doneItem = document.querySelectorAll('.done_item_text')

    for (let index = 0; index < Math.max(doingRun.listItems.length, doneRun.listItems.length); index++) {
        if (doingClick[index]) {
            doingClick[index].addEventListener('click', () => {
                doneRun.add(doingItem[index].innerText)
                doingRun.delete(doingItem[index].innerText)
                reLoad()
                reBindClick()
            })
        }
        if (doingDelete[index]) {
            doingDelete[index].addEventListener('click', () => {
                doingRun.delete(doingItem[index].innerText)
                reLoad()
                reBindClick()
            })
        }
        if (doneClick[index]) {
            doneClick[index].addEventListener('click', () => {
                doingRun.add(doneItem[index].innerText)
                doneRun.delete(doneItem[index].innerText)
                reLoad()
                reBindClick()
            })
        }
        if (doneDelete[index]) {
            doneDelete[index].addEventListener('click', () => {
                doneRun.delete(doneItem[index].innerText)
                reLoad()
                reBindClick()
            })
        }
    }

    localStorage.setItem('doing', JSON.stringify(doingRun.listItems))
    localStorage.setItem('done', JSON.stringify(doneRun.listItems))
}

reBindClick()

// 输入框行为
let inputDom = document.querySelector('.todo_head_input')
let buttonDom = document.querySelector('.todo_head_button')

function addToDo() {
    inputDom.value = inputDom.value.replace(/\s+/g, '')
    if (!inputDom.value) {
        alert('You haven\'t entered anything!')
        return false
    } else {
        doingRun.add(inputDom.value)
        reLoad()
        reBindClick()
        inputDom.value = ''
    }
}

// 点击摁钮触发
buttonDom.addEventListener('click', addToDo)
// 回车键触发
inputDom.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        addToDo()
    }
})
