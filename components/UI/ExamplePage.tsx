import React from 'react';
import { useState } from 'react';

const CollapsibleList = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);

  // Toggle collapse on click
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          {/* Collapsible header */}
          <button
            className="collapse-header"
            onClick={() => handleToggle(index)}
            style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px', background: '#eee', border: '1px solid #ddd' }}
          >
            {item.title}
          </button>

          {/* Collapsible content */}
          <div
            className={`collapse-content ${openIndex === index ? 'open' : 'collapsed'}`}
            style={{
              maxHeight: openIndex === index ? '500px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease-in-out',
              paddingLeft: '15px',
              borderLeft: openIndex === index ? '1px solid #ddd' : 'none',
            }}
          >
            <ul>
              {item.subList.map((subItem, subIndex) => (
                <li key={subIndex} style={{ margin: '5px 0' }}>
                  {subItem}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

// Example usage of the reusable CollapsibleList component
const ExamplePage = () => {
  // Sample data structure with sub-lists
  const data = [
    {
      title: 'Category 1',
      subList: ['Item 1.1', 'Item 1.2', 'Item 1.3'],
    },
    {
      title: 'Category 2',
      subList: ['Item 2.1', 'Item 2.2', 'Item 2.3'],
    },
    {
      title: 'Category 3',
      subList: ['Item 3.1', 'Item 3.2', 'Item 3.3'],
    },
  ];

  return (
    <div>
      <h1>Collapsible List Example</h1>
      <CollapsibleList data={data} />
    </div>
  );
};

export default ExamplePage;
