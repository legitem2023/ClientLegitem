import { useState } from 'react';
import AboutJson from 'json/About.json'
const About = () => {

    return (
        <div className="About">
            <div>{AboutJson[0].Name}</div>
            <div>{AboutJson[0].Description}</div>
            <div>{AboutJson[0].Mission}</div>
            <div>{AboutJson[0]["Why_Choose_Legitem"].Quality_Assurance}</div>
            <div>{AboutJson[0]["Why_Choose_Legitem"].Affordable_Fashion}</div>
            <div>{AboutJson[0].Connect_With_Us}</div>
            <div>{AboutJson[0].Name}</div>
        </div>
    );
};

export default About;


