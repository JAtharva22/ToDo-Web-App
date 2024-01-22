// UpdateNote.js

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
    useNavigate,
    Navigate,
    useLocation,
} from "react-router-dom";
import { API_URL } from '../helper';

const Update = () => {
    const [authToken, setAuthToken] = useState(Cookies.get('authToken'));
    const location = useLocation();
    const currentRoute = location.pathname;
    let r = currentRoute.split("/")
    // Add your state variables for the update form
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        tags: []
    });
    const navigate = useNavigate();

    const fetchNotes = async () => {
        try {
            const response = await fetch(`${API_URL}/gettask/${r[2]}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                }
            });

            if (response.ok) {
                const notesList = await response.json();
                const a = notesList.task;

                // Check if notesList.tasks is defined and not an empty array
                if (notesList.success) {
                    console.log(a)

                    const title = a.title
                    const description = a.description
                    const startDate = a.startDate
                    const endDate = a.endDate
                    const tags = a.tags

                    // Convert the date strings to the desired format
                    const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
                    const formattedEndDate = new Date(endDate).toISOString().split('T')[0];

                    // Update the state
                    setFormData({
                        title,
                        description,
                        startDate: formattedStartDate,
                        endDate: formattedEndDate,
                        tags
                    });
                } else {
                    // Handle the case when there are no tasks
                    console.log('No tasks found');
                }
            }
        } catch (error) {
            // console.error('Error fetching notes:', error);
        }
    };

    useEffect(() => {
        fetchNotes()
    }, []);

    const handleChange = (e) => {
        // Update the form data as the user types
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (
            formData.title.trim() === '' ||
            formData.description.trim() === '' ||
            formData.startDate.trim() === '' ||
            formData.endDate.trim() === ''
        ) {
            alert('Cannot add');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/updatetask/${r[2]}`, {
                method: 'PUT',
                body: JSON.stringify({ ...formData }),
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                }
            });

            if (response.ok) {
                const responselist = await response.json();
                if (responselist.success) {
                    alert("Note updated");
                } else {
                    alert("Note not updated");
                }
                navigate(`/`)
            } else {
                throw new Error('Failed to fetch');
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred while processing your request.");
        }


    };

    return (
        <>
            <div className="container mt-3">
                <h3>
                    Update Note
                </h3>
            </div>
            <div className="container mt-3">
                <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="startDate" className="form-label">Start Date</label>
                        <input type="date" className="form-control" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="endDate" className="form-label">End Date</label>
                        <input type="date" className="form-control" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tags" className="form-label">Tags</label>
                        <input type="text" className="form-control" id="tags" name="tags" value={formData.tags} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    );
};

export default Update;
