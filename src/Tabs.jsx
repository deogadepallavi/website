// Tabs.jsx 
import React, { useState } from 'react';
import './Tabs.css';

const Tabs = ({ tabsConfig }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexLog, setSelectedIndexLog] = useState(0);

  const handleTabClick = (index) => {
    setSelectedIndex(index);
  };

  const handleLogTabClick = (index) => {
    setSelectedIndexLog(index);
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        {tabsConfig.map((tab, index) => (
          <button
            key={index}
            className={selectedIndex === index ? 'active-tab' : ''}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="log-tabs">
        <button
          className={selectedIndexLog === 0 ? 'active-log-tab' : ''}
          onClick={() => handleLogTabClick(0)}
        >
          Log 1
        </button>
        <button
          className={selectedIndexLog === 1 ? 'active-log-tab' : ''}
          onClick={() => handleLogTabClick(1)}
        >
          Log 2
        </button>
      </div>

      <div className="tab-content">
        {tabsConfig[selectedIndex].content}
      </div>

      <div className="log-tab-content">
        {selectedIndexLog === 0 ? (
          <div>Log content 1</div>
        ) : (
          <div>Log content 2</div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
