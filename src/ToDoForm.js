import React, {useState} from 'react';
import './toDoForm.css';


function ToDoForm({addTask, createNewProject}) {
    //викорст ЮсСтейт для збереження інфо про задачу
    const [task, setTask] = useState({
        id: 0,
        title: '',
        description: '',
        tags: '',
        date: '',
        time: '',
        priority: 0,
        status: true
    });
//використовуємо сейт для збереження видимості нового проекта та зберігати його ім'я
    const [isProjectInputVisible, setProjectInputVisible] = useState(false);
    const [projectName, setProjectName] = useState('');

    //обробляє подію створення проекту, перевіряє наявність імені та викликає функцію createNewProject з ім'ям проекту.
    const handleProjectCreation = (e) => {
        e.preventDefault();
        if (projectName) {
            createNewProject(projectName);
            //очищаємо поле вводу після створення проекта
            setProjectName('');
            //змінюємо стан видимості поля вводу нового проекта
            setProjectInputVisible(false);
        }
    };

    //оновлює стан задачі в залежності від змін у полях вводу.
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {...task}; // створимо копию завдання
        //викликає addTask для додавання задачі
        addTask(newTask);
        //потім очищуємо форму
        setTask(prevTask => ({
            ...prevTask,
            id: prevTask.id + 1,
            title: '',
            description: '',
            tags: '',
            date: '',
            time: '',
            priority: 0,
            status: true
        }));
    };

    return (

        <form onSubmit={handleSubmit} id="rootForm">
            <div className="form-group">
                <label className="form-group label" htmlFor="title">Title:</label>
                <input
                    className="form-group input"
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleInputChange}
                    placeholder="Enter task title"
                />
            </div>
            <div className="form-group">
                <label className="form-group label" htmlFor="description">Description:</label>
                <input
                    className="form-group input"
                    type="text"
                    name="description"
                    value={task.description}
                    onChange={handleInputChange}
                    placeholder="Enter task description"
                />
            </div>
            <div className="form-group">
                <label className="form-group label" htmlFor="tags">Tags:</label>
                <input
                    className="form-group input"
                    type="text"
                    name="tags"
                    value={task.tags}
                    onChange={handleInputChange}
                    placeholder="Enter tags"
                />
            </div>
            <div className="form-group">
                <label className="form-group label" htmlFor="date">Date:</label>
                <input
                    className="form-group input"
                    type="date"
                    name="date"
                    value={task.date}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label className="form-group label" htmlFor="time">Time:</label>
                <input
                    className="form-group input"
                    type="time"
                    name="time"
                    value={task.time}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label className="form-group label" htmlFor="priority">Priority:</label>
                <input
                    className="form-group input"
                    type="number"
                    name="priority"
                    value={task.priority}
                    onChange={handleInputChange}
                />
            </div>

            <div className="divButtonsAdd">
                <button className="btnSubmitForm" type="submit">Add Task</button>
                <button className="btnNewproject" type="button"
                        onClick={() => setProjectInputVisible(!isProjectInputVisible)}>
                    {isProjectInputVisible ? 'Cancel' : 'Create New Project'}
                </button>
                {isProjectInputVisible && (
                    <div>
                        <button
                            id="idBtnNewproject"
                            type="button"
                            onClick={handleProjectCreation}>Create Project
                        </button>
                        <input
                            id="idInput"
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="Enter project name"
                        />
                    </div>
                )}
            </div>
        </form>
    );
}

export default ToDoForm;
