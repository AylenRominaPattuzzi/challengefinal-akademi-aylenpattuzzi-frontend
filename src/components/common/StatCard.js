import React from 'react';
import './StatCard.css';

export const StatCard = ({ title, value, iconClass }) => (
  <div className="ui card stat-card">
    <div className="content">
      <div className="header">
        <i className={`${iconClass} icon`} style={{ marginRight: '0.5rem' }}></i>
        {title}
      </div>
      <div className="description" style={{ fontSize: '2rem', marginTop: '1rem' }}>
        {value}
      </div>
    </div>
  </div>
);
