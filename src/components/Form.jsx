import React, { useState } from 'react';
import './style.css';
import { Link, useLocation } from 'react-router-dom';

export default function Form() {
    const location = useLocation();
    const { subcategory } = location.state || {};

    const own = ['1st', '2nd', '3rd', '4th'];
    const fuel = ['CNG', 'Petrol', 'Diesel', 'Electric'];
    const trans = ['Automatic', 'Manual'];

    const [formData, setFormData] = useState({
        brand: subcategory || '',
        year: '',
        fuel: '',
        transmission: '',
        kmDriven: '',
        owner: '',
        title: '',
        description: '',
        price: '',
        state: '',
        name: '',
        phone: '',
    });

    const [images, setImages] = useState(Array(20).fill(null));
    const [dragIndex, setDragIndex] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = [...images];

        for (let i = 0; i < files.length && newImages.includes(null); i++) {
            const url = URL.createObjectURL(files[i]);
            const emptyIndex = newImages.indexOf(null);
            newImages[emptyIndex] = url;
        }

        setImages(newImages);
    };

    const handleDragStart = (index) => setDragIndex(index);

    const handleDrop = (index) => {
        const newImages = [...images];
        [newImages[dragIndex], newImages[index]] = [newImages[index], newImages[dragIndex]];
        setImages(newImages);
        setDragIndex(null);
    };

    const handleDragOver = (e) => e.preventDefault();

    const validate = () => {
        const newErrors = {};
        if (!formData.year) newErrors.year = 'Year is required';
        if (!formData.fuel) newErrors.fuel = 'Fuel type is required';
        if (!formData.transmission) newErrors.transmission = 'Transmission is required';
        if (!formData.kmDriven) newErrors.kmDriven = 'KM Driven is required';
        if (!formData.owner) newErrors.owner = 'Owner info is required';
        if (!formData.title) newErrors.title = 'Title is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.price) newErrors.price = 'Price is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.name || formData.name.length < 3) newErrors.name = 'Name must be at least 3 characters';
        if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Valid 10-digit phone is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            alert("Form submitted successfully!");
            // Submit data to backend here
        }
    };

    return (
        <div>
            <h1 style={{ margin: '20px 0' }}>POST YOUR AD</h1>
            <div className="form-category">
                <h2>SELECT CATEGORY</h2>
                <Link to="/"><p>change</p></Link>
                <hr />
                <h3>INCLUDE SOME DETAILS</h3>

                <form onSubmit={handleSubmit}>
                    <label>Brand <br />
                        <select name="brand" value={formData.brand} style={{ width: '400px', height: '40px' }}>
                            <option value={subcategory}>{subcategory}</option>
                        </select>
                    </label>

                    <div>
                        <label>Year <br />
                            <input name="year" type="number" value={formData.year} onChange={handleChange} style={{ width: '400px', height: '40px' }} />
                            {errors.year && <p className="error">{errors.year}</p>}
                        </label>
                    </div>

                    <div>
                        <label>Fuel <br />
                            <div style={{ display: 'flex' }}>
                                {fuel.map(item => (
                                    <button
                                        type='button'
                                        onClick={() => setFormData({ ...formData, fuel: item })}
                                        key={item}
                                        style={{
                                            height: '30px',
                                            width: '70px',
                                            marginRight: '20px',
                                            backgroundColor: formData.fuel === item ? 'grey' : 'white'
                                        }}>
                                        {item}
                                    </button>
                                ))}
                            </div>
                            {errors.fuel && <p className="error">{errors.fuel}</p>}
                        </label>
                    </div>

                    <div>
                        <label>Transmission <br />
                            <div style={{ display: 'flex' }}>
                                {trans.map(item => (
                                    <button
                                        type='button'
                                        onClick={() => setFormData({ ...formData, transmission: item })}
                                        key={item}
                                        style={{
                                            height: '30px',
                                            width: '70px',
                                            marginRight: '20px',
                                            backgroundColor: formData.transmission === item ? 'grey' : 'white'
                                        }}>
                                        {item}
                                    </button>
                                ))}
                            </div>
                            {errors.transmission && <p className="error">{errors.transmission}</p>}
                        </label>
                    </div>

                    <div>
                        <label>Km Driven <br />
                            <input name="kmDriven" type="number" value={formData.kmDriven} onChange={handleChange} style={{ width: '400px', height: '40px' }} />
                            {errors.kmDriven && <p className="error">{errors.kmDriven}</p>}
                        </label>
                    </div>

                    <div>
                        <label>No. of Owners <br />
                            <div style={{ display: 'flex' }}>
                                {own.map(item => (
                                    <button
                                        type='button'
                                        onClick={() => setFormData({ ...formData, owner: item })}
                                        key={item}
                                        style={{
                                            height: '30px',
                                            width: '70px',
                                            marginRight: '20px',
                                            backgroundColor: formData.owner === item ? 'grey' : 'white'
                                        }}>
                                        {item}
                                    </button>
                                ))}
                            </div>
                            {errors.owner && <p className="error">{errors.owner}</p>}
                        </label>
                    </div>

                    <div>
                        <label>Add Title <br />
                            <input name="title" type="text" value={formData.title} onChange={handleChange} style={{ width: '400px', height: '100px' }} />
                            {errors.title && <p className="error">{errors.title}</p>}
                        </label>
                    </div>

                    <div>
                        <label>Description <br />
                            <input name="description" type="text" value={formData.description} onChange={handleChange} style={{ width: '400px', height: '100px' }} />
                            {errors.description && <p className="error">{errors.description}</p>}
                        </label>
                    </div>

                    <br /><hr />

                    <div>
                        <label>Set a Price in Rs. <br />
                            <input name="price" type="number" value={formData.price} onChange={handleChange} style={{ width: '400px', height: '40px' }} />
                            {errors.price && <p className="error">{errors.price}</p>}
                        </label>
                    </div>

                    <br /><hr />

                    <div style={{ padding: "20px" }}>
                        <h2>UPLOAD UP TO 20 PHOTOS</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 100px)", gap: "10px" }}>
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    draggable
                                    onDragStart={() => handleDragStart(index)}
                                    onDragOver={handleDragOver}
                                    onDrop={() => handleDrop(index)}
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        border: "1px dashed gray",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#f8f8f8",
                                        overflow: "hidden",
                                        position: 'relative',
                                        cursor: img ? 'grab' : 'pointer'
                                    }}
                                >
                                    {img ? (
                                        <img src={img} alt={`img-${index}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    ) : (
                                        <label>
                                            +
                                            <input type="file" accept="image/*" multiple style={{ display: "none" }} onChange={handleImageChange} />
                                        </label>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-section location-section" style={{ padding: '20px 0', borderTop: '1px solid #ccc' }}>
                        <h2>📍 CONFIRM YOUR LOCATION</h2>
                        <select name="state" value={formData.state} onChange={handleChange} style={{ width: '100%', height: '40px', padding: '5px' }}>
                            <option value="">Select your state</option>
                            <option value="delhi">Delhi</option>
                            <option value="maharashtra">Maharashtra</option>
                            <option value="up">Uttar Pradesh</option>
                            <option value="karnataka">Karnataka</option>
                            <option value="bihar">Bihar</option>
                        </select>
                        {errors.state && <p className="error">{errors.state}</p>}
                    </div>

                    <div className="form-section review-section" style={{ padding: '20px 0', borderTop: '1px solid #ccc' }}>
                        <h2>👤 REVIEW YOUR DETAILS</h2>
                        <input name="name" type="text" value={formData.name} placeholder="Your name" onChange={handleChange} style={{ width: '100%', height: '40px', fontSize: '14px', padding: '5px' }} />
                        {errors.name && <p className="error">{errors.name}</p>}
                        <input name="phone" type="text" value={formData.phone} placeholder="+91" onChange={handleChange} style={{ width: '100%', height: '40px', fontSize: '14px', padding: '5px' }} />
                        {errors.phone && <p className="error">{errors.phone}</p>}
                    </div>

                    <div style={{ paddingTop: '20px' }}>
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                backgroundColor: '#002f34',
                                color: '#fff',
                                padding: '12px',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '16px'
                            }}>
                            Post now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
