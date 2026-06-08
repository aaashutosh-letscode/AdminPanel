import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, badge, color, detail }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span>{title}</span>
        {badge && <span className="stat-badge">{badge}</span>}
      </div>
      <div className="stat-card-value" style={{ color: color || '#111827' }}>
        {value}
      </div>
      {detail && <p className="stat-card-detail">{detail}</p>}
    </div>
  );
};

export default StatCard;
