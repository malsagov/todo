const sidebarMenuBtn = document.querySelector('.burger'),
      sidebar = document.querySelector('.sidebar'),
      taskAddIcon = document.querySelector('.task-add'),
      taskName = document.querySelector('.task-name'),
      task = document.querySelector('.task'),
      taskBtn = document.querySelector('.task-btn'),
      details = document.querySelector('.details'),
      detailsCloseBtn = document.querySelector('.details-close'),
      taskOpenDetails = document.querySelector('.task-title'),
      taskAddForm = document.querySelector('.task-form'),
      tasksCompleteBox = document.querySelectorAll('.task-check'),
      taskCheckDate = document.querySelector('.task-check__date'),
      taskContent = document.querySelector('.task-complete__content'),
      taskCompleteBtn = document.querySelector('.task-complete'),
      taskCompleteArrow = document.querySelector('.task-complete__arrow')

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
    try{
        tasksCompleteBox.forEach((i) => {
            i.addEventListener('change', (e) => {
                if (i == e.target){
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
    taskOpenDetails.addEventListener('click', () => {
        details.classList.add('details-open')
    })
}

function closeDetails() {
    detailsCloseBtn.addEventListener('click', () => {
        details.classList.remove('details-open')
    })
}



burgerMenu()
changeTasksStyle()
closeDetails()
completeTask()
openNewTaskContent()



