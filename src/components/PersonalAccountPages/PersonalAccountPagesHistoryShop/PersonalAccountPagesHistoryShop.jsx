import './PersonalAccountPagesHistoryShop.sass';
import React, { useEffect, useState } from 'react';
import {PersonalAccountPagesMain} from '../PersonalAccountPagesMain/PersonalAccountPagesMain';
import usePagination from '../../../hooks/usePagination';
import { Pagination } from '../../Pagination/Pagination';
import useMediaQuery from '../../../utils/hooks/useMediaQuery';
import { v4 as uuidv4 } from 'uuid';
import { accountItems } from '../../../tempdata/account/accountItems';
import { AccountItem } from '../AccountItem/AccountItem';


export const PersonalAccountPagesHistoryShop = () => {


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
    count: accountItems.length
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
      <section className='historyShop__form'>
        <div className="historyShop__form-container">
            {accountItems.slice(firstContentIndex, lastContentIndex).map((item) => (
              <AccountItem  data={item}  key={uuidv4()} />
            ))}
        </div>
        <div className="historyShop__pagination">
          {itemsPerPage < accountItems.length && (
            <Pagination options={{ nextPage, prevPage, page, gaps, setPage, totalPages }} />
          )}
        </div>
      </section>
    </>
  );
};
