import React from 'react';
import "./weekListTasks.css";

export function WeekListTasks({
                                  weekTasks,
                                  status,
                                  deleteWeekTask,
                                  editingTask,
                                  setEditingTask,
                                  cancelEdit,
                                  saveEditTask,
                                  tasks
                              }) {

    const getDayName = (date) => {
        const days = ['НД', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
        return days[date.getDay()];
    };
    //для зменшення масиву до одного значення, в даному випадку об'єкт acc.
    const tasksByDay = weekTasks.reduce((acc, task) => {
        const date = new Date(task.date);
        const dayName = getDayName(date);
        if (!acc[dayName]) {
            acc[dayName] = [];
        }
        acc[dayName].push(task);
        return acc;
    }, {});

    const daysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД'];


    return (
        <>
            <h1 id="h1TasksWeek">Tasks on week</h1>
            <div className="weekDaysBox">
                {daysOfWeek.map(day => (
                    <div key={day} className="daySection">
                        <h2>{day}</h2>
                        <div>
                            {tasksByDay[day]?.length === 0 ? (
                                <p>No tasks for this day</p>
                            ) : (
                                <ul className="ulWeeklist">
                                    {tasksByDay[day]?.map(task => (
                                        <li key={task.id} className="liWeekList">
                                            <div className="elememtWeekList">
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
                                                    <input value={editingTask.title} placeholder="Edit title"
                                                           onChange={(e) => setEditingTask({
                                                               ...editingTask,
                                                               title: e.target.value
                                                           })}/>
                                                    <input value={editingTask.description}
                                                           placeholder="Edit description"
                                                           onChange={(e) => setEditingTask({
                                                               ...editingTask,
                                                               description: e.target.value
                                                           })}/>
                                                    <input value={editingTask.tags} placeholder="Edit tags"
                                                           onChange={(e) => setEditingTask({
                                                               ...editingTask,
                                                               tags: e.target.value
                                                           })}/>
                                                    <input value={editingTask.date} type="date"
                                                           placeholder="Edit date"
                                                           onChange={(e) => setEditingTask({
                                                               ...editingTask,
                                                               date: e.target.value
                                                           })}/>
                                                    <input value={editingTask.time} type="time"
                                                           placeholder="Edit time"
                                                           onChange={(e) => setEditingTask({
                                                               ...editingTask,
                                                               time: e.target.value
                                                           })}/>
                                                    <input value={editingTask.priority}
                                                           placeholder="Edit priority"
                                                           type="number"
                                                           onChange={(e) => setEditingTask({
                                                               ...editingTask,
                                                               priority: Number(e.target.value)
                                                           })}/>

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
                                            <div className="imgIkonsWeek">
                                                <button onClick={() => {
                                                    status(task.id);
                                                }} id="imgButtonCheck">
                                                    Toggle Status
                                                </button>
                                                <button onClick={() => setEditingTask(task)} id="imgButtonEdit">
                                                    <img className="imgButtonEdit"
                                                         src="/free-icon-edit-4007772.png"
                                                         alt="edit"/>
                                                </button>
                                                <button onClick={() => deleteWeekTask(task.id)}
                                                        id="imgButtonDelete">
                                                    <img className="imgButtonDelete"
                                                         src="/free-icon-delete-1214428.png"
                                                         alt="delete"/>
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

