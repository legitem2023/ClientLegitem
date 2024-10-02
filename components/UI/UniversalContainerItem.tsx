import React from 'react';
import { Icon } from '@iconify/react';
import HtmlRenderer from 'components/Html/HtmlRenderer';
import TimestampConverter from 'components/Partial/timestamp/TimestampConverter';
import Image from 'next/image';
import { imageSource } from 'utils/scripts';

interface UniversalContainerItemProps {
  title: string;
  thumbnail: string;
  summary: string;
  dateCreated: string;
  index: number;
}

const UniversalContainerItem: React.FC<UniversalContainerItemProps> = ({ title, thumbnail, summary, dateCreated, index }) => {
  return (
    <div className="UniversalContainerItem">
      <div className="UniversalContainerHead LabelHead">
        <Icon icon="fa6-solid:newspaper" /> {title}
      </div>
      <div className="UniversalThumbnail">
        <Image src={imageSource(thumbnail)} height={100} width={200} alt={`image${index}`} />
      </div>
      <HtmlRenderer htmlContent={summary} />
      <div className="UniversalContainerFooter">
        Date: <TimestampConverter timestamp={dateCreated} />
      </div>
    </div>
  );
};

export default UniversalContainerItem;
