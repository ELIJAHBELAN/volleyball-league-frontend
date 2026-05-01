import React, { useState } from "react";
import "./teamform.css";

const SantaRosaVolleyballForm = () => {
    const [formData, setFormData] = useState({
        barangay: "",
        address: "",
        name: "",
        age: "",
        contact: "",
        height: "",
        weight: "",
        medicalConditions: "",
        competitionLevel: "",
        position: ""
    });

    // Updated for Santa Rosa, Laguna
    const santaRosaBarangays = [
        "Aplaya", "Balibago", "Caingin", "Dila", "Dita", "Don Jose", 
        "Ibaba", "Kanluran", "Labas", "Macabling", "Malitlit", "Malusak", 
        "Market Area", "Pooc", "Pulong Santa Cruz", "Santo Domingo", 
        "Sinalhan", "Tagapo"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const phoneRegex = /^\+639\d{9}$/;
        if (!phoneRegex.test(formData.contact)) {
            alert("❌ Invalid contact number. It must start with +639 followed by 9 digits.");
            return;
        }

        try {
            // Updated to your volleyball-league-backend link
            const response = await fetch("https://volleyball-league-backend.onrender.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert("🏐 REGISTRATION SUBMITTED SUCCESSFULLY!");
                setFormData({
                    barangay: "", address: "", name: "", age: "", contact: "", 
                    height: "", weight: "", medicalConditions: "", competitionLevel: "", position: ""
                });
            } else {
                alert("❌ Submission failed: " + (result.message || "Unknown error"));
            }
        } catch (error) {
            alert("❌ Could not connect to the server. Make sure your backend is running.");
        }
    };

    return (
        <div className="league-form-container">
            <h1 className="league-form-title">Santa Rosa Volleyball League</h1>
            
            <p className="league-form-subtitle">
                Official registration and assessment portal for volleyball players<br/>
                residing in Santa Rosa City for the 2026 Season.
            </p>

            <form onSubmit={handleSubmit}>
                <select name="barangay" value={formData.barangay} onChange={handleChange} className="league-form-input" required>
                    <option value="">Select Residing Barangay</option>
                    {santaRosaBarangays.map((brgy, index) => (
                        <option key={index} value={brgy}>{brgy}</option>
                    ))}
                </select>
                
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Complete Address (Street, Subdivision, etc.)" className="league-form-input" required />

                <hr className="league-form-divider" />

                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="league-form-input" required />
                <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" min="5" max="60" className="league-form-input" required />
                <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Number (+639XXXXXXXXX)" className="league-form-input" required />
                <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="Height (in cm)" min="50" max="250" className="league-form-input" required />
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight (in kg)" min="20" max="200" className="league-form-input" required />
                <textarea name="medicalConditions" value={formData.medicalConditions} onChange={handleChange} placeholder="Medical Conditions (Write 'None' if applicable)" rows="3" className="league-form-input" required></textarea>

                <hr className="league-form-divider" />

                {/* Updated Competition Levels for Volleyball */}
                <select name="competitionLevel" value={formData.competitionLevel} onChange={handleChange} className="league-form-input" required>
                    <option value="">Select Competition Level</option>
                    <option value="12U">12 & Under (Elementary)</option>
                    <option value="15U">15 & Under (Aspirants)</option>
                    <option value="18U">18 & Under (Juniors)</option>
                    <option value="Open">Open Category (19 - 30 Years Old)</option>
                    <option value="Vets">Executive / Veterans (31 & Above)</option>
                </select>
                
                {/* Updated Positions for Volleyball */}
                <select name="position" value={formData.position} onChange={handleChange} className="league-form-input" required>
                    <option value="">Select Court Position</option>
                    <option value="Setter">Setter (S)</option>
                    <option value="Outside Hitter">Outside Hitter (OH)</option>
                    <option value="Opposite Hitter">Opposite Hitter (OP)</option>
                    <option value="Middle Blocker">Middle Blocker (MB)</option>
                    <option value="Libero">Libero (L)</option>
                </select>

                <button type="submit" className="league-form-button">Submit Registration</button>
            </form>
        </div>
    );
};

export default SantaRosaVolleyballForm;