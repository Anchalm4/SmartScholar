import React, { useState, useEffect } from 'react';
import './RoadmapPages.css'; // We'll create this file next for styling

function RoadmapPages() {
    // State to hold the list of all roadmaps
    const [roadmaps, setRoadmaps] = useState([]); 
    
    // State to hold the currently selected roadmap (with all its steps)
    const [selectedRoadmap, setSelectedRoadmap] = useState(null);
    
    // State for loading and error messages
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // 1. Fetch all roadmaps when the component first loads
    useEffect(() => {
        const fetchRoadmaps = async () => {
            try {
                // Assuming your backend is running on port 8000
                // You might need to configure this URL in a .env file
                const response = await fetch('http://127.0.0.1:8000/roadmaps/');
                if (!response.ok) {
                    throw new Error('Failed to fetch roadmaps');
                }
                const data = await response.json();
                setRoadmaps(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchRoadmaps();
    }, []); // Empty array means this runs only once on mount

    // 2. Function to fetch a single roadmap's details
    const handleRoadmapSelect = async (id) => {
        setIsLoading(true);
        setSelectedRoadmap(null); // Clear previous selection
        setError(null);

        try {
            const response =  await fetch("http://127.0.0.1:8000/roadmaps/");

            if (!response.ok) {
                throw new Error('Failed to fetch roadmap details');
            }
            const data = await response.json();
            setSelectedRoadmap(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // 3. Render the component
    return (
        <div className="roadmap-container">
            <h2>Career Roadmaps</h2>
            
            <div className="roadmap-selector">
                <p>Select a roadmap to begin:</p>
                {roadmaps.map(roadmap => (
                    <button 
                        key={roadmap.id} 
                        onClick={() => handleRoadmapSelect(roadmap.id)}
                        className={selectedRoadmap?.id === roadmap.id ? 'active' : ''}
                    >
                        {roadmap.title}
                    </button>
                ))}
            </div>

            {error && <p className="error-message">Error: {error}</p>}
            
            {isLoading && <p>Loading...</p>}

            {selectedRoadmap && (
                <div className="roadmap-details">
                    <h3>{selectedRoadmap.title}</h3>
                    <p>{selectedRoadmap.description}</p>
                    
                    <ul className="roadmap-steps">
                        {selectedRoadmap.steps.map(step => (
                            <li key={step.id} className="roadmap-step">
                                <div className="step-order">{step.order}</div>
                                <div className="step-content">
                                    <h4>{step.title}</h4>
                                    <p>{step.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default RoadmapPages;

