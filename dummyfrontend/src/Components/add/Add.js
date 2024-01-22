import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { API_URL } from '../helper';

function Add() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(false);

    useEffect(() => {
        setAuthToken(Cookies.get('authToken'));
        setIsAuthenticated(!!Cookies.get('authToken'));
    }, [authToken]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        tags: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
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
            console.log(`${API_URL}/addtask/`)
            const response = await fetch(`${API_URL}/addtask/`, {
                method: 'POST',
                body: JSON.stringify({ ...formData }),
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                }
            });

            if (response.ok) {
                const responselist = await response.json();
                if (responselist.success) {
                    alert("Note added");
                } else {
                    alert("Note not added");
                }

                setFormData({
                    title: '',
                    description: '',
                    startDate: '',
                    endDate: '',
                    tags: ''
                });
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
                    Add Note
                </h3>
            </div>
            <div className="container mt-3">
                <form onSubmit={handleSubmit}>
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

export default Add