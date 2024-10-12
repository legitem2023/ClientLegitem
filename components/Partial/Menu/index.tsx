'use client';

import React from 'react';
import menuList from '../../../json/menu.json';
import { Icon } from '@iconify/react';
import { setGlobalState } from 'state';
import { useQuery } from '@apollo/client';
import { READ_CATEGORY, READ_PRODUCT_TYPES } from 'graphql/queries'; // Assuming you have this query for Collection Items

const Menu: React.FC = () => {
  const { data: categoryData, loading: categoryLoading, error: categoryError } = useQuery(READ_CATEGORY);
  const { data: productTypesData, loading: productTypesLoading, error: productTypesError } = useQuery(READ_PRODUCT_TYPES);

  if (categoryLoading || productTypesLoading ) return <div>Loading...</div>;
  if (categoryError || productTypesError ) return <div>Error loading data</div>;

  const sortEngine = (e: any) => {
    console.log(e.target.getAttribute("value"));
    setGlobalState("thumbnailCategory", e.target.getAttribute("value"));
  };

  const sortEngine_1 = (e: any) => {
    console.log(e.target.getAttribute("value"));
    setGlobalState("thumbnailProductTypes", e.target.getAttribute("value"));
  };

  const sortEngine_2 = (e: any) => { // For Collection Items
    console.log(e.target.getAttribute("value"));
    setGlobalState("thumbnailCollectionItems", e.target.getAttribute("value"));
  };


  const ShowAll = (name:any) =>{

    if(name==='Discounted'){
      setGlobalState("thumbnailDiscounted",name);
    }

    if(name==='New'){
      setGlobalState("thumbnailNewData",name);
    }

    if(name==='All Products'){
      setGlobalState('thumbnailCategory',"");
      setGlobalState('thumbnailProductTypes',"");
      setGlobalState('thumbnailSearch',"");
      setGlobalState("thumbnailDiscounted","");
      setGlobalState("thumbnailNewData","");
    }
    setGlobalState("drawer", true)
  }



  return (
    <ul className='Menu'>
      <li className='Menu_label'>Menu</li>
      {menuList.map((item: any, index: any) => (
        <li key={index} className={item.Name === 'Category' || item.Name === 'Product Types' || item.Name === 'Collection Items' ? 'category_li' : 'menu_li'}>
          {item.Name === 'Category' || item.Name === 'Product Types' || item.Name === 'Collection Items' ? (
            <label
              htmlFor={"collapse" + item.Name.toLowerCase().replace(" ", "") + index}
              className='categorylabel'
            >
              <Icon icon={item.icon} />
              <span>{item.Name}</span>
              <Icon icon='bxs:chevron-down' />
            </label>
          ) : (
            <label onClick={() => ShowAll(item.Name)} className='menulabel'>
              <Icon icon={item.icon} />{item.Name}
            </label>
          )}

          <input type='checkbox' id={"collapse" + item.Name.toLowerCase().replace(" ", "") + index} className='hidden' />
          <span></span>

          <ul className='category_list'>
            <br />
            {item.Name === 'Category' && categoryData?.getCategory?.length > 0 && categoryData?.getCategory?.map((category: any, i: any) => (
              <li className='category_list_div' key={i} onClick={(e: any) => { sortEngine(e); setGlobalState("drawer", true); }} value={category.Name}>
                <Icon icon="fluent-mdl2:radio-bullet"/>{category.Name}
              </li>
            ))}

            {item.Name === 'Product Types' && productTypesData?.getProductTypes?.length > 0 && productTypesData?.getProductTypes?.map((type: any, i: any) => (
              <li className='category_list_div' key={i} onClick={(e: any) => { sortEngine_1(e); setGlobalState("drawer", true); }} value={type.Name}>
                <Icon icon="fluent-mdl2:radio-bullet" />{type.Name}
              </li>
            ))}

            {item.Name === 'Collection Items' && productTypesData?.getProductTypes?.length > 0 && productTypesData?.getProductTypes?.map((item: any, i: any) => (
              <li className='category_list_div' key={i} onClick={(e: any) => { sortEngine_2(e); setGlobalState("drawer", true); }} value={item.Name}>
                <Icon icon="fluent-mdl2:radio-bullet" />{item.Name}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
