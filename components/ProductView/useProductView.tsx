import React, { useEffect,useState } from 'react'
import DataManager from 'utils/DataManager';
const useProductView = () => {
    // const [useIpadd,setIpadd] = useState(null);
    const Manager = new DataManager();
    useEffect(() => {
        const ipaddresses:any = Manager.Ipaddress();
        // setIpadd(ipaddresses)
    });
      
    return [Manager];
}

export default useProductView;