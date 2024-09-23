// components/PrivacyPolicy.js
import HtmlRenderer from 'components/Html/HtmlRenderer';
import React from 'react';

const PrivacyPolicy = ({ data }) => {

    return (
        <div>
          {data?.readPrivacy?.map((item: any,idx:number) => (
            <div key={idx}>
              <HtmlRenderer htmlContent={item.content}/>
            </div>
          ))}
        </div>
    );
};

export default PrivacyPolicy;
