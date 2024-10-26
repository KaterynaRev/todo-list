import React from 'react';
import ToDoForm from './ToDoForm';
import {DrawTask} from "./DrawTask";
import "./toDoApp.css";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import {WeekListTasks} from "./WeekListTasks";
import {DayListTasks} from "./DayListTasks";
import {MonthListTasks} from "./MonthListTasks";
import {ProjectListTask} from "./ProjectListTask";
import {UseToDoApp} from "./UseToDoApp";
import {SerchInToDo} from "./SerchInToDo";


export function ToDoApp() {
    const {
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
    } = UseToDoApp();

    function handleClick(event, index) {
        if (event.button === 2) {
            event.preventDefault();
            const userUnswer = prompt("Do you really want to delete this project? Y - yes, N - no");
            if (userUnswer === 'Y' || userUnswer === 'y') {
                setNamesProject(prev => prev.filter((_, i) => i !== index));
                setProjectTasks([]);
            }
        }
    }

    return (
        <Router>
            <div className="mainDiv">
                <div id="divNavGroups">
                    <div className="dropdownNav">
                        <div id="mLine">
                            <div id='lneLink'></div>
                            <div id='lneLink'></div>
                            <div id='lneLink'></div>
                        </div>
                        <div className="dropdown-contentLink">
                            <nav id="idNav">
                                <ul id="idUlNav">
                                    {namesProject.map((project, index) => (
                                        <li className="ulLinkTask" key={index} onMouseDown={(event) => handleClick(event, index)}>
                                            <Link to={`/${project}`} className="libk"><p className="cLink">{project}</p>
                                            </Link></li>
                                        ))}
                                    <li className="ulLinkTask"><Link className="libk" to="/day-tasks"><p className="cLink">Day</p>
                                    </Link></li>
                                    <li className="ulLinkTask"><Link className="libk" to="/week-tasks"><p className="cLink">Week</p>
                                    </Link></li>
                                    <li className="ulLinkTask"><Link className="libk" to="/month-tasks"><p className="cLink">Month</p>
                                    </Link></li>
                                    <li className="ulLinkTask"><Link className="libk" to="/"><p className="cLink">Main</p>
                                    </Link></li>
                                </ul>
                            </nav>

                        </div>
                    </div>
                    <nav>
                        <ul id="iSer">
                            <li><SerchInToDo
                                serchNameTask={serchNameTask}
                                serchWordInTask={serchWordInTask}
                                serchTagsInTask={serchTagsInTask}
                                serchPrioritetTask={serchPrioritetTask}
                            /></li>
                        </ul>
                    </nav>
                </div>
                <Routes>
                    {namesProject.map((project, index) => (
                        <Route key={index} path={`/${project}`} element={
                            <>
                                <h1 id="h1Project">{project}</h1>
                                <ProjectListTask status={status}
                                                 projectTasks={projectTasks}
                                                 editingTask={editingTask}
                                                 setEditingTask={setEditingTask}
                                                 cancelEdit={cancelEdit}
                                                 saveEditTask={saveEditTask}
                                                 deleteProjectTask={deleteProjectTask}

                                />
                            </>
                        }/>
                    ))}
                    <Route path="/" element={
                        <>
                            <ToDoForm addTask={addTask}
                                      createNewProject={createNewProject}
                            />
                            <button id="idBtnResetFile" onClick={resetTasks}>скинуть до мок файлів</button>
                            <DrawTask
                                tasks={tasks}
                                deleteTask={deleteTask}
                                setEditingTask={setEditingTask}
                                editingTask={editingTask}
                                status={status}
                                saveEditTask={saveEditTask}
                                cancelEdit={cancelEdit}
                                addDayListTask={addDayListTask}
                                addWeekListTask={addWeekListTask}
                                addMonthListTask={addMonthListTask}
                                namesProject={namesProject}
                                addProjectListTask={addProjectListTask}
                                deleteDayTask={deleteDayTask}
                                deleteWeekTask={deleteWeekTask}
                                deleteMonthTask={deleteMonthTask}
                                deleteProjectTask={deleteProjectTask}
                            />
                        </>
                    }/>

                    <Route path="/day-tasks" element={
                        <DayListTasks
                            status={status}
                            dayTasks={dayTasks}
                            deleteDayTask={deleteDayTask}
                            setEditingTask={setEditingTask}
                            editingTask={editingTask}
                            saveEditTask={saveEditTask}
                            cancelEdit={cancelEdit}
                            tasks={tasks}
                        />
                    }/>

                    <Route path="/week-tasks" element={
                        <WeekListTasks
                            status={status}
                            weekTasks={weekTasks}
                            deleteWeekTask={deleteWeekTask}
                            setEditingTask={setEditingTask}
                            editingTask={editingTask}
                            saveEditTask={saveEditTask}
                            cancelEdit={cancelEdit}
                            tasks={tasks}
                        />
                    }/>
                    <Route path="/month-tasks" element={
                        <MonthListTasks
                            status={status}
                            monthTasks={monthTasks}
                            deleteMonthTask={deleteMonthTask}
                            setEditingTask={setEditingTask}
                            editingTask={editingTask}
                            cancelEdit={cancelEdit}
                            saveEditTask={saveEditTask}
                        />
                    }/>
                </Routes>
            </div>
        </Router>
    );

}

export default ToDoApp;

