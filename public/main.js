const sidebarMenuBtn = document.querySelector('.burger'),
      sidebar = document.querySelector('.sidebar'),
      taskAddIcon = document.querySelector('.task-add'),
      taskName = document.querySelector('.task-name'),
      task = document.querySelector('.task'),
      taskBtn = document.querySelector('.task-btn'),
      details = document.querySelector('.details'),
      detailsCloseBtn = document.querySelector('.details-close'),
      tasksTitle = document.querySelectorAll('.task-title'),
      taskAddForm = document.querySelector('.task-form'),
      taskCheckDate = document.querySelector('.task-check__date'),
      taskContent = document.querySelector('.task-complete__content'),
      taskCompleteBtn = document.querySelector('.task-complete'),
      taskCompleteArrow = document.querySelector('.task-complete__arrow'),
      tasks = document.querySelector('.tasks'),
      detailsDeleteBtn = document.querySelector('.details-delete')

function burgerMenu() {

    sidebarMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar-active')
    })
}

function changeTasksStyle() {
    
    taskName.addEventListener('focus', () =>{
        task.classList.add('task-focus')
        taskName.classList.add('task-fucus_text')
    })

    taskName.addEventListener('blur', () =>{
        task.classList.remove('task-focus')
        taskName.classList.remove('task-fucus_text')
    })

    taskAddIcon.addEventListener('click', () => {
        taskName.focus()
    })

    taskName.addEventListener('input', () => {
        if (taskName.value) {
            taskBtn.style.visibility = 'visible'
            taskBtn.style.cursor = 'pointer'
        } else {
            taskBtn.style.visibility = 'hidden'
            taskBtn.style.cursor = 'default'
        }
    })
}

function completeTask(){
    const tasksCompleteBox = document.querySelectorAll('.task-check')
    try{
        tasksCompleteBox.forEach((i) => {
            i.addEventListener('change', (e) => {
                if (i == e.target){
                    console.log(i)
                    fetch('/complete', {
                            method: 'POST',
                            body: JSON.stringify({
                                complete: i.checked,
                                date: i.dataset.date
                            }),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((response) => {

                        })
                        .then((body) => {
                            document.location.href = '/'
                        })
                    }
                    })
        })
    }catch(e){

    }
}

function openNewTaskContent(){
    taskCompleteBtn.addEventListener('click', () => {
        taskContent.classList.toggle('task-complete__content-active')
        taskCompleteArrow.classList.toggle('task-complete__arrow-active')
    })
}


function openDetails(){
    const detailsTitle = document.querySelector('.details-title'),
          detailsDesc = document.querySelector('.details-desc')
    tasksTitle.forEach((i) => {
        
        i.addEventListener('click', (e) => {
            if (e.target == i) {
                e.preventDefault()
                details.classList.add('details-open')
                fetch('/details', {
                    method: 'POST',
                    body: JSON.stringify({
                        date: i.dataset.date
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    return res.json()
                })
                .then((body) => {
                    const task = body.find(j => j.date == +i.dataset.date)
                    detailsTitle.value = task.title
                    detailsTitle.dataset.date = task.date
                    detailsDesc.value = task.desc
                    detailsDesc.dataset.date = task.date
                    detailsDeleteBtn.dataset.date = task.date
                })
            }
        })
    })
}


function closeDetails() {
    detailsCloseBtn.addEventListener('click', () => {
        details.classList.remove('details-open')
    })
}

function editTaskTitle(){
    const detailsTitle = document.querySelector('.details-title')

    detailsTitle.addEventListener('change', (e) => {
        fetch('/edit-title', {
            method: 'POST',
            body: JSON.stringify({
                date: detailsTitle.dataset.date,
                title: detailsTitle.value
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((body) => {
            
        })
        tasksTitle.forEach(i => {
            if (+i.dataset.date == detailsTitle.dataset.date){
                i.textContent = detailsTitle.value
            }
        })
    })
}

function editTaskDesc(){
    const detailsDesc = document.querySelector('.details-desc')

    detailsDesc.addEventListener('change', () => {
        fetch('/edit-desc', {
            method: 'POST',
            body: JSON.stringify({
                date: detailsDesc.dataset.date,
                desc: detailsDesc.value
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
        })
        .then((body) => {
        })
    })
}

function deleteTaskFromDeteils(){
    detailsDeleteBtn.addEventListener('click', () => {
        fetch('/details-remove', {
            method: 'POST',
            body: JSON.stringify({
                date: detailsDeleteBtn.dataset.date,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
        })
        .then((body) => {
            
        })
        document.location.href = '/'
    })
}

// function addNewTask(){
//     taskAddForm.addEventListener('submit', async (e) => {
//         e.preventDefault()
//         await fetch('/add', {
//             method: 'POST',
//             body: JSON.stringify({
//                 task: taskName.value
//             }),
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then((res) => {
//             console.log(res)
//             return res.text()
//         })
//         .then((body) => {
//             console.log(body)
//             // document.location.href = '/'
//         })
//         // window.location.reload()
//     })
    
// }

burgerMenu()
changeTasksStyle()
closeDetails()
completeTask()
openNewTaskContent()
openDetails()
closeDetails()
editTaskTitle()
editTaskDesc()
deleteTaskFromDeteils()
// addNewTask()



