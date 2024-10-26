import './drawTask.css';
import React from "react";


export function DrawTask({
                             tasks,
                             deleteTask,
                             setEditingTask,
                             editingTask,
                             saveEditTask,
                             cancelEdit,
                             status,
                             addDayListTask,
                             addWeekListTask,
                             addMonthListTask,
                             namesProject,
                             addProjectListTask,
                             deleteDayTask,
                             deleteWeekTask,
                             deleteMonthTask,
                             deleteProjectTask
                         }) {
    return (
        <ul id="mockList">
            {tasks.map(task => (
                    <li key={task.id} className="mockListLiClass">
                        <div>
                            <strong>Title</strong>: {task.title}<br/>
                            <strong>Description</strong>: {task.description}<br/>
                            <strong>Tags</strong>: {task.tags}<br/>
                            <strong>Date</strong>: {task.date}<br/>
                            <strong>Time</strong>: {task.time}<br/>
                            <strong>Priority</strong>: {task.priority}<br/>
                            <strong>Status</strong>: {task.status ? 'Not Completed' : 'Completed'}
                            <div className="dropdown">
                                <button id='btnCreateList'>Add Task in project</button>
                                <div className="dropdown-content">
                                    <button onClick={() => addDayListTask(task)} id='btnCreateList'>Day list
                                    </button>
                                    <button onClick={() => {
                                        addWeekListTask(task);
                                        addMonthListTask(task)
                                    }} id='btnCreateList'>Week list
                                    </button>
                                    <button onClick={() => addMonthListTask(task)} id='btnCreateList'>Month
                                        list
                                    </button>
                                    {namesProject.length === 0 ? (
                                        <span></span>
                                    ) : (
                                        namesProject.map((project, index) => (
                                            <div key={index}>
                                                <button onClick={() => addProjectListTask(task)}
                                                        id='btnCreateList'>{project}</button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* форма редагування, показується тільки для поточного завдання */}
                        {editingTask?.id === task.id && (
                            <div className="formUpdate">
                                <input value={editingTask.title} placeholder="Edit title"
                                       onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}/>
                                <input value={editingTask.description} placeholder="Edit description"
                                       onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}/>
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

                                <button onClick={() => {
                                    saveEditTask(editingTask, 'day');
                                    saveEditTask(editingTask, 'week');
                                    saveEditTask(editingTask, 'month');
                                    saveEditTask(editingTask, 'tasks');
                                    saveEditTask(editingTask, 'project');
                                }
                                }>Save
                                </button>
                                <button onClick={cancelEdit}>Cancel</button>
                            </div>
                        )}
                        <div className="imgIkons">
                            <button onClick={() => {
                                status(task.id);
                            }} id="imgButtonCheck">Toggle status
                            </button>
                            <button onClick={() => setEditingTask(task)} id="imgButtonEdit">
                                <img className="imgButtonEdit" src="/free-icon-edit-4007772.png" alt="edit"/>
                            </button>
                            <button onClick={() => {
                                deleteTask(task.id);
                                deleteDayTask(task.id);
                                deleteWeekTask(task.id);
                                deleteMonthTask(task.id);
                                deleteProjectTask(task.id);
                            }} id="imgButtonDelete">
                                <img className="imgButtonDelete" src="/free-icon-delete-1214428.png" alt="delete"/>
                            </button>
                        </div>
                    </li>
                )
            )}
        </ul>
    );
}


