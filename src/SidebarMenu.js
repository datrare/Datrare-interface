import React from 'react';

function SidebarMenu(props) {
  const { attributes, handleSort } = props;

  return (
    <div className="sidebar-menu">
      <h2>Attributes</h2>
      <ul>
        {attributes.map((attr, index) => (
          <li key={index}>
            <button onClick={() => handleSort(attr)}>{attr}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarMenu;
