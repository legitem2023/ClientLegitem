import { Icon } from '@iconify/react';
import Ratings from 'components/Partial/Ratings/Ratings';
import { useState } from 'react';

const Accordion = ({ data }) => {
    const Reviews = data.readFeedBack;
    console.log(Reviews)

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null); // Collapse if clicked again
        } else {
            setActiveIndex(index); // Expand clicked item
        }
    };

    return (
        <div className=''> 
            <div className='LabelHead carouselLabel'><Icon icon="mdi:cart" /><span>Product Reviews</span></div>
            <div className="faq-accordion">
                {Reviews.map((rev, index) => (
                    <div className="faq-item" key={index}>
                        <div className="faq-question" onClick={() => toggleAccordion(index)}>
                            <div style={{display:"flex",flexDirection:"row"}}>{rev.productCode}<Ratings data={rev.Ratings}/></div> 
                            <span className={`arrow ${activeIndex === index ? 'open' : ''}`}>&#9660;</span>
                        </div>
                        {activeIndex === index && (
                            <div className="faq-answer">
                                <p>{rev.By}</p>
                                <p>{rev.Comment}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Accordion;
