import React, {useState} from 'react';
import "./dayListTasks.css"

export function DayListTasks({
                                 dayTasks,
                                 status,
                                 deleteDayTask,
                                 editingTask,
                                 setEditingTask,
                                 cancelEdit,
                                 saveEditTask,
                             }) {

    //зберіг стан sortByPriority, який контролює, чи задачі сортуються за пріоритетом.
    const [sortByPriority, setSortByPriority] = useState(false);
    //функція приймає task та повертає об'єкт Date, створений з її дати та часу.
    const getDateTime = (task) => {
        return new Date(`${task.date}T${task.time}`);
    };
    //копіюємо та сортуємо за часом, використовуючи функцію getDateTime
    const sortedTimeTask = [...dayTasks].sort((a, b) => getDateTime(a) - getDateTime(b));

    const sortedPriorityTask = [...dayTasks].sort((a, b) => {
        if (a.priority === b.priority) {
            return 0;
        }
        return a.priority > b.priority ? -1 : 1;
    });
                             
    return (
        <>
            <button id="btnSortedTask" onClick={() => setSortByPriority(!sortByPriority)}>
                {sortByPriority ? 'Sort by Time' : 'Sort by Priority'}</button>
            <h1 id="h1TodayTask">Today tasks</h1>
            {/*якщо задач немає, відображається порожній список*/}
            {sortedTimeTask.length === 0 ? (
                <ul className="ulDaylistNull">
                    <li className="liDayListNull">
                        <div className="elememtDayListNull">
                            <strong>Title</strong><br/>
                            <strong>Description</strong><br/>
                            <strong>Tags</strong><br/>
                            <strong>Date</strong><br/>
                            <strong>Time</strong><br/>
                            <strong>Priority</strong><br/>
                            <strong>Status</strong>
                        </div>
                    </li>
                </ul>
            ) : (
                <ul className="ulDaylist">
                    {(sortByPriority ? sortedPriorityTask : sortedTimeTask).map(task => (
                        <li key={task.id} className="liDayList">
                            <div className="elememtDayList">
                                <strong>Title</strong>: {task.title}<br/>
                                <strong>Description</strong>: {task.description}<br/>
                                <strong>Tags</strong>: {task.tags}<br/>
                                <strong>Date</strong>: {task.date}<br/>
                                <strong>Time</strong>: {task.time}<br/>
                                <strong>Priority</strong>: {task.priority}<br/>
                                <strong>Status</strong>: {task.status ? 'Not Completed' : 'Completed'}
                            </div>
                            {editingTask?.id === task.id && (
                                <div className="formUpdate">
                                    {/*значення поля вводу дорівнює назві задачі, яку редагуємо.*/}
                                    {/*обробник події, працює при зміні тексту в полі, оновлює стан editingTask,
                                     копіюючи всі існуючі дані задачі і змінюючи тільки поле ... на нове значення з поля вводу (e.target...).*/}
                                    <input value={editingTask.title} placeholder="Edit title"
                                           onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}/>
                                    <input value={editingTask.description} placeholder="Edit description"
                                           onChange={(e) => setEditingTask({
                                               ...editingTask,
                                               description: e.target.value
                                           })}/>
                                    <input value={editingTask.tags} placeholder="Edit tags"
                                           onChange={(e) => setEditingTask({...editingTask, tags: e.target.value})}/>
                                    <input value={editingTask.data} type="date" placeholder="Edit date"
                                           onChange={(e) => setEditingTask({...editingTask, date: e.target.value})}/>
                                    <input value={editingTask.time} type="time" placeholder="Edit time"
                                           onChange={(e) => setEditingTask({...editingTask, time: e.target.value})}/>
                                    <input value={editingTask.priority} placeholder="Edit priority" type="number"
                                           onChange={(e) => setEditingTask({
                                               ...editingTask,
                                               priority: Number(e.target.value)
                                           })}/>

                                    {/*при кліку на кнопку збергіаємо зміни і оновлюємо стан задач в потрібних нам файлах*/}
                                    <button onClick={() => {
                                        saveEditTask(editingTask, 'tasks');
                                        saveEditTask(editingTask, 'day');
                                        saveEditTask(editingTask, 'week');
                                        saveEditTask(editingTask, 'month');
                                    }}>Save
                                    </button>
                                    <button onClick={cancelEdit}>Cancel</button>
                                </div>
                            )}
                            <div className="imgIkonsDay">
                                <button
                                    id="imgButtonCheck"
                                    onClick={() => {
                                        status(task.id);
                                    }}>
                                    Toggle Status
                                </button>
                                {/*при кліку запускаємо оновити стейт для змін   задач*/}
                                <button onClick={() => setEditingTask(task)} id="imgButtonEdit">
                                    <img className="imgButtonEdit" src="/free-icon-edit-4007772.png" alt="edit"/>
                                </button>
                                <button onClick={() => deleteDayTask(task.id)} id="imgButtonDelete">
                                    <img className="imgButtonDelete" src="/free-icon-delete-1214428.png"
                                         alt="delete"/>
                                </button>
                            </div>
                        </li>))
                    }
                </ul>
            )}
        </>
    );
}
