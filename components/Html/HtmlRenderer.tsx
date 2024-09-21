import React from 'react';
import { replaceOembedWithIframe } from 'utils/scripts';

interface Props {
  htmlContent: string;
}

const HtmlRenderer: React.FC<Props> = ({ htmlContent }) => {
  const data = replaceOembedWithIframe(htmlContent);
  return (
    <div className="dangerousHTML" dangerouslySetInnerHTML={{ __html: data }} />
  );
};

export default HtmlRenderer;
