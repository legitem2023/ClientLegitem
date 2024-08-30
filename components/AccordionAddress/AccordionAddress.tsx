import React from 'react';
import { useState } from 'react';

const AccordionAddress = ({ address }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index:any) => {
        if (activeIndex === index) {
            setActiveIndex(null); // Collapse if clicked again
        } else {
            setActiveIndex(index); // Expand clicked item
        }
    };
    return (
        <div className="faq-accordion">
            {address.map((add:any, index:number) => (
                <div className="faq-item" key={index}>
                    <div className="faq-question" onClick={() => toggleAccordion(index)}>
                        {add.Address}
                        <span className={`arrow ${activeIndex === index ? 'open' : ''}`}>&#9660;</span>
                    </div>
                    {activeIndex === index && (
                        <div className="faq-answer">
                            <button>Set Default</button>
                            <p>{add.fullname}</p>
                            <p>{add.contactNo}</p>
                            <p>{add.Address}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AccordionAddress;
