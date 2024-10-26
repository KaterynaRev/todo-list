import React from 'react';
import "./serchInToDo.css";

export function SerchInToDo({serchNameTask, serchWordInTask, serchTagsInTask, serchPrioritetTask}) {

    const handleSearch = (criteria) => {
        serchNameTask(criteria);
    };
    const handleSearchWord = (criteria) => {
        serchWordInTask(criteria);
    };

    const handleSearchTags = (criteria) => {
        serchTagsInTask(criteria);
    };
    const handleSearchPriority = (criteria) => {
        serchPrioritetTask(criteria);
    };

    return (
        <div id="mainDiivSerch">
            <div className="dropdownSerch">
                <button id='btnSerch1'>Select a search criteria</button>
                <div className="dropdown-contentSerch">
                    <button onClick={() => handleSearch('name')} id='btnSerch'>name</button>
                    <button onClick={() => handleSearchWord('word')} id='btnSerch'>word</button>
                    <button onClick={() => handleSearchTags('tag')} id='btnSerch'>tag</button>
                    <button onClick={() => handleSearchPriority('priority')} id='btnSerch'>priority</button>
                </div>
            </div>
        </div>
    )
}