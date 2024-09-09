'use client';

import React from 'react';
import menuList from '../../../json/menu.json';
import { Icon } from '@iconify/react';
import { setGlobalState } from 'state';
import { useQuery } from '@apollo/client';
import { READ_CATEGORY, READ_PRODUCT_TYPES } from 'graphql/queries';

const Menu = () => {
  const { data: categoryData, loading: categoryLoading, error: categoryError } = useQuery(READ_CATEGORY);
  const { data: productTypesData, loading: productTypesLoading, error: productTypesError } = useQuery(READ_PRODUCT_TYPES);

  if (categoryLoading || productTypesLoading) return <div>Loading...</div>;
  if (categoryError || productTypesError) return <div>Error loading data</div>;

  const sortEngine = (e: any) => {
    console.log(e.target.getAttribute("value"));
    setGlobalState("thumbnailCategory", e.target.getAttribute("value"));
  };

  const sortEngine_1 = (e: any) => {
    console.log(e.target.getAttribute("value"));
    setGlobalState("thumbnailProductTypes", e.target.getAttribute("value"));
  };

  return (
    <ul className='Menu'>
      <li className='Menu_label'>Menu</li>
      {menuList.map((item: any, index: any) => (
        <li key={index} className={item.Name === 'Category' || item.Name === 'Product Types' ? 'category_li' : 'menu_li'}>
          {item.Name === 'Category' || item.Name === 'Product Types' ? (
            <label
              htmlFor={"collapse" + item.Name.toLowerCase().replace(" ", "") + index}
              className='categorylabel'
            >
              <Icon icon={item.icon} />
              <span>{item.Name}</span>
              <Icon icon='bxs:chevron-down' />
            </label>
          ) : (
            <label onClick={() => setGlobalState("drawer", true)} className='menulabel'>
              <Icon icon={item.icon} />{item.Name}
            </label>
          )}

          <input type='checkbox' id={"collapse" + item.Name.toLowerCase().replace(" ", "") + index} className='hidden' />
          <span></span>

          <ul className='category_list'>
            <br />
            {item.Name === 'Category' && categoryData.getCategory.length > 0 && categoryData.getCategory.map((category: any, i: any) => (
              <li className='category_list_div' key={i} onClick={(e: any) => { sortEngine(e); setGlobalState("drawer", true); }} value={category.Name}>
                <Icon icon={category.icon} />{category.Name}
              </li>
            ))}

            {item.Name === 'Product Types' && productTypesData.getProductTypes.length > 0 && productTypesData.getProductTypes.map((type: any, i: any) => (
              <li className='category_list_div' key={i} onClick={(e: any) => { sortEngine_1(e); setGlobalState("drawer", true); }} value={type.Name}>
                {type.Name}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
