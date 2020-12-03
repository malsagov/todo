const sidebarMenuBtn = document.querySelector('.burger'),
      sidebar = document.querySelector('.sidebar'),
      taskAddIcon = document.querySelector('.task-add'),
      taskName = document.querySelector('.task-name'),
      task = document.querySelector('.task'),
      taskBtn = document.querySelector('.task-btn'),
      details = document.querySelector('.details'),
      detailsCloseBtn = document.querySelector('.details-close')

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

function addNewTask(){
    
    taskBtn.addEventListener('mousedown', () => {
        const newTask = document.createElement('div')

        newTask.className = 'new-task'
        newTask.insertAdjacentHTML('afterbegin', `
        <div class="task-add">
            <input id="task-check" type="radio">
            <label class="task-check_label" for="task-check"></label>
        </div>
        <div class="task-title">${taskName.value}</div>
        <div class="task-delete">Удалить</div>
        `)
        task.insertAdjacentElement( 'afterEnd', newTask)
        taskName.value = ''
        taskName.blur()
        taskBtn.style.visibility = 'hidden'
        deleteTask()
        openDetails()
        
        
    })

    taskName.addEventListener('keypress', (e) => {
        if(e.keyCode == 13) {
            const newTask = document.createElement('div')

            newTask.className = 'new-task'
            newTask.insertAdjacentHTML('afterbegin', `
            <div class="task-add">
                <input id="task-check" type="radio">
                <label class="task-check_label" for="task-check"></label>
            </div>
            <div class="task-title">${taskName.value}</div>
            <div class="task-delete">Удалить</div>
            `)
            task.insertAdjacentElement( 'afterEnd', newTask)
            taskName.value = ''
            taskName.blur()
            taskBtn.style.visibility = 'hidden'
            deleteTask()
            openDetails()
            
        }
        
    })

}

function deleteTask() {
    const taskDelete = document.querySelector('.task-delete')
    taskDelete.addEventListener('click', (e) => {
        e.target.parentNode.remove()
    })
}

function openDetails(){
    const taskOpenDetails = document.querySelector('.task-title')
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
addNewTask()
closeDetails()




