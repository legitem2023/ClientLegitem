import React from 'react'
import {GET_NUM_OF_VIEWS } from 'graphql/queries';
import { useQuery } from '@apollo/client';

const Views = ({data}) => {
    const { data: NumberOFViews, loading: viewsLoading } = useQuery(GET_NUM_OF_VIEWS);
    if(viewsLoading) return
  return (
    <span>{NumberOFViews.getNumberOfViews.filter((numbitem: any) => numbitem.productCode === data.productCode).length}</span>
    )
}

export default Views