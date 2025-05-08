import React, { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

export default function Category() {
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();

  const handleClick = (category) => {
    setActiveCategory(prev => (prev === category ? null : category));
  };

  const gotoForm = (category, subcategory) => {
    navigate('/form', {
      state: { category, subcategory }
    });
  };

  return (
    <div className="category">
      <h2>POST YOUR AD</h2>
      <div className="category-items">
        <h6>Choose a category</h6>
        <hr />
        <div className="category-container">
          <ul>
            <li onClick={() => handleClick('cars')}>Cars</li>
            <li onClick={() => handleClick('properties')}>Properties</li>
            <li onClick={() => handleClick('jobs')}>Jobs</li>
            <li onClick={() => handleClick('mobiles')}>Mobiles</li>
          </ul>

          <div className="subcategory-panel">
            {activeCategory === 'cars' && (
              <ul className="subcategory-list">
                <li onClick={() => gotoForm('Cars', 'Cars')}>Cars</li>
              </ul>
            )}
            {activeCategory === 'properties' && (
              <ul className="subcategory-list">
                <li onClick={() => gotoForm('Properties', 'For Sale')}>For Sale</li>
                <li onClick={() => gotoForm('Properties', 'For Rent')}>For Rent</li>
              </ul>
            )}
            {activeCategory === 'jobs' && (
              <ul className="subcategory-list">
                <li onClick={() => gotoForm('Jobs', 'Web Developer')}>Web Developer</li>
                <li onClick={() => gotoForm('Jobs', 'BPO')}>BPO</li>
                <li onClick={() => gotoForm('Jobs', 'TeleCaller')}>TeleCaller</li>
              </ul>
            )}
            {activeCategory === 'mobiles' && (
              <ul className="subcategory-list">
                <li onClick={() => gotoForm('Mobiles', 'Mobiles')}>Mobiles</li>
                <li onClick={() => gotoForm('Mobiles', 'Accessories')}>Accessories</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
