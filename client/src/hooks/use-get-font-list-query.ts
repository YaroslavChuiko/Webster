import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './use-app-selector';
import { fetchFontList } from '~/store/slices/font-list-slice';
import { ThunkDispatch } from '@reduxjs/toolkit';

const useGetFontListQuery = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { fontList, loading } = useAppSelector((state) => state.fontList);

  useEffect(() => {
    if (loading === 'succeeded' && fontList.length > 0) {
      setIsLoaded(true);
      return;
    }
    dispatch(fetchFontList());
    setIsLoaded(false);
  }, [loading]);

  return { fontList, isLoaded };
};

export default useGetFontListQuery;
