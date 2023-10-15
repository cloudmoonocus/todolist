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
        doneHtml = `<div class="imgEmpty"><img src="data:image/png;base64,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" alt="No Done Item"><div>No Done Item</div></div>`
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
