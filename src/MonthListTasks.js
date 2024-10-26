import React, {useEffect, useState} from 'react';
import "./monthListTask.css";
import TaskItemMonth from "./TaskItemMonth.js";

export function MonthListTasks({
                                   monthTasks, status,
                                   deleteMonthTask, editingTask,
                                   setEditingTask,
                                   cancelEdit,
                                   saveEditTask,
                                   tasks
                               }) {

    //створили стан, ініціалізували як порожній масив
    const [weeks, setWeeks] = useState([]);
    //повертає день тижня (0 - неділя) для першого дня місяця в заданому році та місяці.
    // const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

    //групуємо завдання по тижнях
    const groupTasksByWeek = (tasks) => {
        const groupedWeeks = [];                                                  //порожній масив з тижнями
        const currentYear = new Date().getFullYear();                    //пточний рік
        const currentMonth = new Date().getMonth();                      //поточний місяць
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);   //кількість днів

        //створили масив з сім єл де ел+ обє з властв дата та таск
        let week = Array.from({length: 7}, () => ({date: '', tasks: []}));

        //проходимо циклом по кожному дню місяця
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(currentYear, currentMonth, day);  //поточн день
            const dayOfWeek = currentDate.getDay();

            //форматує дату у форматі YYYY-MM-DD. поточ рік - місяць.перетворюєм число на рядок. та додаємо  ведучі нулі до рядка, щоб він завжди
            // мав принаймні два символи. Це потрібно для форматування місяців як 01, 02,
            const formattedDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

            console.log('Processing Date:', formattedDate);
            console.log('Tasks:', tasks);
            //фільтруэмо завданя для поточного дня порівнює дату завдання з formattedDate
            const tasksForDay = tasks.filter(task => {
                console.log('порівняли:', task.date, 'з', formattedDate);
                return task.date === formattedDate;
            });

            console.log('Tasks for Date:', formattedDate, tasksForDay);
            //оновлення дня тижня дод обє з датою та завданням для поточного дня в індекс тижня (dayOfWeek).
            week[dayOfWeek] = {date: formattedDate, tasks: tasksForDay};

            //якщо це неділя або останній день місяця, додає week до groupedWeeks і ініціалізує новий тиждень.
            if (dayOfWeek === 6 || day === daysInMonth) {
                groupedWeeks.push(week);
                console.log('Pushing Week:', week);
                week = Array.from({length: 7}, () => ({date: '', tasks: []}));
            }
        }

        console.log('Grouped Weeks:', groupedWeeks);
        return groupedWeeks;
    };

    // виконується після рендерингу компонента, коли змінюється значення monthTasks. якщо зміниться стан монс, фунц знов викликається
    useEffect(() => {
        console.log('в Юз ефект:', monthTasks);
        setWeeks(groupTasksByWeek(monthTasks));
    }, [monthTasks]);


    return (
        <>
            <h1 id="h1TasksMonth">Task on month</h1>
            <div className="monthView">
                <div className="daysOfWeek">
                    {["НД", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"].map((dayW, index) => (
                        <div key={index} className="dayHeader">{dayW}</div>
                    ))}
                </div>
                {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="weekBox">
                        {week.map((day, dayIndex) =>
                            <div key={dayIndex} className="dayBox">
                                <h3 id="idDate">{day.date ? new Date(day.date).toLocaleDateString() : day.date}</h3>
                                {day.tasks.length === 0 ? (
                                    <p id="pIdNoTask">Немає завдань на цю дату</p>
                                ) : (
                                    <ul className="taskListMonth">
                                        {day.tasks.map(task => (
                                            <TaskItemMonth
                                                tasks={tasks}
                                                key={task.id}
                                                task={task}
                                                status={status}
                                                editingTask={editingTask}
                                                setEditingTask={setEditingTask}
                                                saveEditTask={saveEditTask}
                                                cancelEdit={cancelEdit}
                                                deleteMonthTask={deleteMonthTask}
                                            />
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}
