import React, {useState} from 'react';
import './monthListTask.css';

const TaskItemMonth = ({
                           status,
                           task,
                           editingTask,
                           setEditingTask,
                           cancelEdit,
                           saveEditTask,
                           deleteMonthTask,
                           tasks
                       }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <li className="taskItemMonth"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div className="taskTitleMonth">
                <strong>Title</strong>: {task.title}
            </div>
            {isHovered && (
                <div className="taskDetailsTooltip">
                    <div>
                        <strong>Description</strong>: {task.description}<br/>
                        <strong>Tags</strong>: {task.tags}<br/>
                        <strong>Date</strong>: {task.date}<br/>
                        <strong>Time</strong>: {task.time}<br/>
                        <strong>Priority</strong>: {task.priority}<br/>
                        <strong>Status</strong>: {task.status ? 'Not Completed' : 'Completed'}
                    </div>
                    <div className="imgIkonsMonth">
                        <button onClick={() => {
                            status(task.id);
                        }} id="imgButtonCheckMonth">
                            Toggle Status
                        </button>
                        <button onClick={() => setEditingTask(task)} id="imgButtonEditMonth">
                            <img className="imgButtonEditMonth" src="/free-icon-edit-4007772.png" alt="edit"/>
                        </button>
                        <button onClick={() => deleteMonthTask(task.id)} id="imgButtonDeleteMonth">
                            <img className="imgButtonDeleteMonth" src="/free-icon-delete-1214428.png" alt="delete"/>
                        </button>
                    </div>
                </div>)}
            {editingTask?.id === task.id && (
                <div className="formUpdateMonth">
                    <input value={editingTask.title}
                           placeholder="Edit title"
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
                    <input value={editingTask.tags}
                           placeholder="Edit tags"
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
        </li>
    );
};

export default TaskItemMonth;
