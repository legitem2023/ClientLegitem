import React from "react";
import { Gallery } from "components/Gallery/Gallery";
import ModelViewer from "components/Partial/ThreeJS/ModelViewer";
import 'react-tabs/style/react-tabs.css';
import { Icon } from "@iconify/react";
import EffectsRenderer from "components/Partial/VTO/EffectsRenderer";
import { ViewGallery } from "components/Gallery/ViewGallery";

type PropsProductTabs = {
  data: (name: string) => void;
}
const ProductTabs:React.FC<PropsProductTabs> = ({data}:any) =>{
  const [isActive, setIsActive] = React.useState("Gallery");

  const openCity = (tabID: any, elmnt: any) => {
    let i: any;
    let tabcontent: any;
    let tablinks: any;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(tabID).style.display = "block";
    document.getElementById('GalleryBut').style.borderBottom = 'solid 4px transparent';
    document.getElementById('ThreeJSBut').style.borderBottom = 'solid 4px transparent';
    document.getElementById('VTOBut').style.borderBottom = 'solid 4px transparent';

    // Display the selected tab content
    document.getElementById(tabID).style.display = "block";
    // Set border for the selected button based on tabID
    switch (tabID) {
      case 'Gallery':
        document.getElementById(elmnt).style.borderBottom = 'solid 4px #003f22';
        break;
      case 'ThreeJS':
        document.getElementById(elmnt).style.borderBottom = 'solid 4px #003f22';
        break;
      case 'VTO':
        document.getElementById(elmnt).style.borderBottom = 'solid 4px #003f22';
        break;
      default:
        break;
    }



  }
  
  return (
    <div className="flex flex-col px-4">
      <div className="flex w-full flex-col">
        <div className="grid grid-cols-3 gap-4">
          <button className="tablink" onClick={() => { setIsActive("Gallery"); openCity('Gallery', 'GalleryBut') }} id="GalleryBut"><Icon icon="pepicons-pop:photo" /> Photos</button>
          <button className="tablink" onClick={() => { setIsActive("ThreeJS"); openCity('ThreeJS', 'ThreeJSBut') }} id="ThreeJSBut"><Icon icon='fluent-mdl2:cube-shape-solid'></Icon> 3D Model</button>
          <button className="tablink" onClick={() => { setIsActive("VTO"); openCity('VTO', 'VTOBut') }} id="VTOBut">VTO</button>
        </div>
        <div id="Gallery" className="tabcontent">
          {isActive === "Gallery" ? <Gallery data={data[0].subImageFieldOut} length={data} slidesPerView={1} spaceBetween={50}/> : ""}
        </div>
        <div id="ThreeJS" className="tabcontent">
          {isActive === "ThreeJS" ? <div className='ThreeJS' id='ThreeJS'>
            <ModelViewer data={data}/>
          </div> : ""}
        </div>
        <div id="VTO" className="tabcontent">
          {isActive === "VTO" ? <EffectsRenderer /> : ""}
        </div>
      </div>
    </div>
  );
}

export default ProductTabs