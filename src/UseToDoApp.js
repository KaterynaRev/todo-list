import {useEffect, useState} from 'react';
import {mockFile} from './mockFile';


function getFromLocalStorage(key) {
    //намагається отримати дані з ЛоакалСтор за вказаним переданим ключем
    const savedData = localStorage.getItem(key);
    //якщо дані не Налл перетвор з джсон в ДЖОбєкт
    return savedData ? JSON.parse(savedData) : [];
}

//тут зберігаємо дані Дата під вказаним ключем
function setInLocalStorage(key, data) {
    //JSON.stringify(data) перетворює дані з формату джСкрипт в рядок джСон. а СетАйтем зберігає отриманий рядок JSON під вказаним ключем.
    localStorage.setItem(key, JSON.stringify(data));
}


export function UseToDoApp() {

    //свор стан tasks і функцію setTasks для його оновлення. ініціал відбувається через функцію,
    // що дозволяє виконати код один раз при першому рендерінгу.
    const [tasks, setTasks] = useState(() => {
        //викликає ф getFromLocalStorage для отримання таск з локал сховища.
        const storedTasks = getFromLocalStorage('tasks') || mockFile;   // якщо дані не знайдені, використ mockFile як запасний варіант.
        return storedTasks.map(task => ({...task, type: task.type || 'general'}));  // Якщо type відсутній, встановлює його значення за замовчуванням на 'general'.

        //без моків
        // const storedTasks = getFromLocalStorage('tasks');
        // return storedTasks.length > 0 ? storedTasks : [];

    });
    const [editingTask, setEditingTask] = useState(null);
    //отримуючи дані з локального сховища за ключем 'dayTasks і т.д
    const [dayTasks, setDayTasks] = useState(() => getFromLocalStorage('dayTasks'));
    const [weekTasks, setWeekTasks] = useState(() => getFromLocalStorage('weekTasks'));
    const [monthTasks, setMonthTasks] = useState(() => getFromLocalStorage('monthTasks'));
    const [projectTasks, setProjectTasks] = useState(() => getFromLocalStorage('projectTasks'));
    //якщо дані стану не знайдено ініціалізуємо порож масив
    const [namesProject, setNamesProject] = useState(getFromLocalStorage('namesProject') || []);

    //cинхронізує стани з локальним сховищем при зміні будь-якого з них, щоб зберегти останні зміни.
    //виконується щоразу, коли змінюється один із станів у масиві залежностей
    //будь-який з цих станів оновлюється, викликається функція в useEffect.
    useEffect(() => {
        setInLocalStorage('tasks', tasks);
        setInLocalStorage('dayTasks', dayTasks);
        setInLocalStorage('weekTasks', weekTasks);
        setInLocalStorage('monthTasks', monthTasks);
        setInLocalStorage('namesProject', namesProject);
        setInLocalStorage('projectTasks', projectTasks);
    }, [tasks, dayTasks, weekTasks, monthTasks, namesProject, projectTasks]);

    function resetTasks() {
        setTasks(mockFile);  // Скидає tasks до значення mockFile
    }

    //без мокків
    // function resetTasks() {
    //     setTasks([]);  // скидає tasks до пустого масиву
    //     localStorage.removeItem('tasks'); // Очищає дані з localStorage
    // }

    function addTask(newTask) {
        setTasks([...tasks, newTask]);     // додає нове завдання до списку загального
    }

    function addDayListTask(dayTask) {
        if ((!dayTasks.some(task => task.id === dayTask.id)))     // додає завдання до списку на день
        {
            setDayTasks([...dayTasks, dayTask]);           // оновлюємо стан завданнь на день
        } else {
            alert("Task already exists", dayTask);
        }
    }

    function addProjectListTask(projectTask) {
        if ((!projectTasks.some(task => task.id === projectTask.id))) {
            setProjectTasks([...projectTasks, projectTask]);
        } else {
            alert("Task already exists", projectTask);
        }
    }

    function addWeekListTask(weekTask) {
        if ((!weekTasks.some(task => task.id === weekTask.id))) {
            setWeekTasks([...weekTasks, weekTask]);
        } else {
            alert("Task already exists", weekTask);
        }
    }

     //some методом перевіряємо чи пройшов перевірку хочаб один елемент в масиві
    function addMonthListTask(monthTask) {
        if ((!monthTasks.some(task => task.id === monthTask.id))) {
            setMonthTasks([...monthTasks, monthTask]);
        } else {
            alert("Task already exists", monthTask);
        }
    }

    function deleteProjectTask(taskId) {
        setProjectTasks(projectTasks.filter(task => task.id !== taskId));  // видаляє завдання за його id
    }

    function deleteMonthTask(taskId) {
        setMonthTasks(monthTasks.filter(task => task.id !== taskId));
    }

    function deleteWeekTask(taskId) {
        setWeekTasks(weekTasks.filter(task => task.id !== taskId));
    }

    function deleteDayTask(taskId) {
        setDayTasks(dayTasks.filter(task => task.id !== taskId));

    }

    function deleteTask(taskId) {
        setTasks(tasks.filter(task => task.id !== taskId));
    }

    function status(taskId) {
        //перебирає копії елем, якщо його Айді збіг з Айді завдання яке прийшло в параметрах, змінюємо стан на протилеж
        const newStatus = [...tasks].filter(item => {
            if (item.id === taskId) {
                item.status = !item.status;
            }
            return item;
        })
        setTasks(newStatus);
        console.log(newStatus);
    }

    //приймає два парам нові завдання та їх тип
    function saveEditTask(updatedTask, type) {
       //спочатку ф-я вибирає тип для оновлення стану
        const setTaskState = {
            project: setProjectTasks,
            tasks: setTasks,
            day: setDayTasks,
            week: setWeekTasks,
            month: setMonthTasks,
        }[type];
        //якщо тип дійсний вона оновлює старе на нове
        if (setTaskState) {
            setTaskState(prevTasks =>
                prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
            );
            //після чого скидує редагування на Нал
            setEditingTask(null);
        } else {
            console.error("Invalid task type:", type);
        }
    }

    function cancelEdit() {
        setEditingTask(null);
    }

    function createNewProject(nameProject) {
        setNamesProject(prev => [...prev, nameProject]);
    }

    function serchNameTask() {
        const searchName = prompt("Enter name task for search: ");
        if (!searchName) return; // Перевірка на пустий рядок

        //пфільтруємо і перевіряємо чи існує певний ел в масиві
        const foundTasks = tasks.filter(task =>
            task.title.toLowerCase().includes(searchName.toLowerCase())
        );
        //якщо так, то за доп методу Мар створюємо нов масив на основі існуючого
        if (foundTasks.length > 0) {
            const taskDetails = foundTasks.map(task =>
                `ID: ${task.id}, Title: ${task.title}, Description: ${task.description}, Priority: ${task.priority}`
            ).join('\n');
            alert(`Found ${foundTasks.length} tasks:\n${taskDetails}`);
        } else {
            alert("No tasks found.");
        }
    }

    function serchWordInTask() {
        const seWordInTask = prompt("Enter word for found: ");
        if (!seWordInTask) return; // Перевірка на пустий рядок

        const foundTasksForWord = tasks.filter(task =>
            task.description && task.description.toLowerCase().includes(seWordInTask.toLowerCase()));

        if (foundTasksForWord.length > 0) {
            const taskDetailsWord = foundTasksForWord.map(task =>
                `ID: ${task.id}, Title: ${task.title}, Description: ${task.description}, Priority: ${task.priority}`
            ).join('\n');
            alert(`Found ${foundTasksForWord.length} tasks:\n${taskDetailsWord}`);
        } else {
            alert("No tasks found.");
        }
    }

    function serchTagsInTask() {
        const seTagsInTask = prompt("Enter tag for found: ");
        if (!seTagsInTask) return;

        const foundTags = tasks.filter(task =>
            task.tags && task.tags.toLowerCase().includes(seTagsInTask.toLowerCase()));

        if (foundTags.length > 0) {
            const taskDetailsTags = foundTags.map(task =>
                `ID: ${task.id}, Title: ${task.title}, Description: ${task.description}, Priority: ${task.priority}`
            ).join('\n');
            alert(`Found ${foundTags.length} tasks:\n${taskDetailsTags}`);
        } else {
            alert("No tasks found.");
        }
    }

    function serchPrioritetTask() {
        const sePrioritetTask = prompt("Enter priority for found: ");
        const newPr = parseInt(sePrioritetTask, 10);
        if (isNaN(newPr)) {
            console.log("Це не число!");
            return;
        }

        const foundPriority = tasks.filter(task => task.priority === newPr);

        if (foundPriority.length > 0) {
            const taskDetailsPr = foundPriority.map(task =>
                `ID: ${task.id}, Title: ${task.title}, Description: ${task.description}, Priority: ${task.priority}`
            ).join('\n');
            alert(`Found ${foundPriority.length} tasks:\n${taskDetailsPr}`);
        } else {
            alert("No tasks found.");
        }
    }

    return {
        serchPrioritetTask,
        serchTagsInTask,
        serchWordInTask,
        serchNameTask,
        tasks,
        editingTask,
        dayTasks,
        weekTasks,
        monthTasks,
        projectTasks,
        namesProject,
        setEditingTask,
        resetTasks,
        addTask,
        deleteTask,
        saveEditTask,
        createNewProject,
        setNamesProject,
        setProjectTasks,
        deleteProjectTask,
        cancelEdit,
        status,
        addDayListTask,
        addWeekListTask,
        addMonthListTask,
        addProjectListTask,
        deleteDayTask,
        deleteWeekTask,
        deleteMonthTask
    };
}