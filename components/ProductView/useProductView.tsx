import React, { useEffect,useState } from 'react'
import DataManager from 'utils/DataManager';
const useProductView = () => {
    // const [useIpadd,setIpadd] = useState(null);
    const Manager = new DataManager();
    let ipaddresses:any
    useEffect(() => {
    ipaddresses = Manager.Ipaddress();
    },[ipaddresses]);
      
    return {ipaddresses};
}

export default useProductView;