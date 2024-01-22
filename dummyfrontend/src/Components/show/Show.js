// NoteList.js

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
    useNavigate,
    Navigate
} from "react-router-dom";
import { API_URL } from '../helper';

const Show = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(false);
    const navigate = useNavigate();

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        setAuthToken(Cookies.get('authToken'));
        setIsAuthenticated(!!Cookies.get('authToken'));
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await fetch(`${API_URL}/gettask/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                }
            });

            if (response.ok) {
                const notesList = await response.json();
                setNotes(notesList.tasks);
            } else {
                throw new Error('Failed to fetch notes');
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
            // If there's an error, set notes to an empty array
            setNotes([]);
        }
    };

    const handledeleteall = async () => {
        // Modify the API endpoint to include the search query
        const response = await fetch(`${API_URL}/deletealltask`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            }
        });
        let responselist = await response.json()
        console.log(response.json)

        setNotes([]);
    };

    const handledeleteOne = async (id) => {
        // Modify the API endpoint to include the search query
        const response = await fetch(`${API_URL}/deletetask/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            }
        });
        let responselist = await response.json()
        fetchNotes();
    };

    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            alert("Cannot search empty")
            return;
        }
        // Modify the API endpoint to fetch all tasks
        const response = await fetch(`${API_URL}/tasksearch?key=${searchQuery}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            }
        })
        let responselist = await response.json()
        setNotes(responselist.tasks)
    };

    return (
        <div className="container mt-3">
            <h2>Note List</h2>
            <div className='container mt-3 my-10'>
                <label>
                    Search by Tags/Title:
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </label>
                <button onClick={handleSearch}>Search</button>
            </div>
            <button onClick={fetchNotes} className="btn btn-primary">
                Show All
            </button>
            <button onClick={handledeleteall} className="btn btn-danger mx-4">
                Delete All
            </button>

            {Array.isArray(notes) && notes.length !== 0 && (
                <ul className="list-group">
                    {notes.map((note) => (
                        <li key={note._id} className="list-group-item">
                            <h5>{note.title}</h5>
                            <p>{note.description}</p>
                            <p>Start Date: {note.startDate}</p>
                            <p>End Date: {note.endDate}</p>
                            <p>
                                Tags:
                                <ul>
                                    {note.tags.map((tag, index) => (
                                        <li key={index}>{tag}</li>
                                    ))}
                                </ul>
                            </p>
                            <button onClick={() => navigate(`/update/${note._id}`)}>
                                edit
                            </button>
                            <button onClick={() => handledeleteOne(note._id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Show;