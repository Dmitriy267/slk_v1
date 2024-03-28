import './PersonalAccountPagesFavourites.sass';
import React, { useEffect, useState } from 'react';
import {PersonalAccountPagesMain} from '../PersonalAccountPagesMain/PersonalAccountPagesMain';
import usePagination from '../../../hooks/usePagination';
import { Pagination } from '../../Pagination/Pagination';
import useMediaQuery from '../../../utils/hooks/useMediaQuery';
import { v4 as uuidv4 } from 'uuid';
import {favoriteItems} from '../../../tempdata/account/favoriteItems';
import {FavoriteItem} from '../FavoriteItem/FavoriteItem';


export const PersonalAccountPagesFavourites = () => {

  const [itemsPerPage, setItemsPerPage] = useState(3);
  const isMobile = useMediaQuery('(max-width: 700px)');
  const isTablet = useMediaQuery('(max-width: 1200px)');

  // Использование кастомного хука usePagination
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    gaps,
    setPage,
    totalPages
  } = usePagination({
    contentPerPage: itemsPerPage,
    count: favoriteItems.length
  });

  useEffect(() => {
    if (isMobile) {
      setItemsPerPage(3);
    } else if (isTablet) {
      setItemsPerPage(6);
    } else {
      setItemsPerPage(9);
    }
  }, [isMobile, isTablet]);

  return (
    <>
      <PersonalAccountPagesMain/>
      <section className='favoriteItems__form'>
        <div className="favoriteItems__form-container">
            {favoriteItems.slice(firstContentIndex, lastContentIndex).map((item) => (
              <FavoriteItem  data={item}  key={uuidv4()} />
            ))}
        </div>
        <div className="favoriteItems__pagination">
          {itemsPerPage < favoriteItems.length && (
            <Pagination options={{ nextPage, prevPage, page, gaps, setPage, totalPages }} />
          )}
        </div>
      </section>
    </>
  );
};
