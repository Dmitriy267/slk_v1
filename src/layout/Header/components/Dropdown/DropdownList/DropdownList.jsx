import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './DropdownList.sass';

const DropdownList = ({dropdownList, handleActiveLink, activeLink, setBurgerOpened, setDropdownHidden, dropdownHidden, isBurger}) => {

  const dropdownRef = useRef(null)
  // Скрывает или показывает dropdown по клику на элемент
  const toggleDropdownHide = (item) => {
    handleActiveLink(item.id);
    setDropdownHidden(prevState => !prevState);
    if (isBurger) {
      setBurgerOpened(false);
    }
    
  };

  // Закрытие дропдауна при клике вне дропдауна
  useEffect(() => {
    const onClick = e => {
      if (!dropdownRef.current.contains(e.target)) {
        const dropBtn = document.querySelector('.dropdown__btn')
        if (!dropBtn.contains(e.target)) {
          setDropdownHidden(false)
        }
      }
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);


  return (
    <>
      <div ref={dropdownRef} className="dropdown">
        <ul className={`dropdown__list`}>
          {
            dropdownList.map(item =>
              <li
                key={item.id}
                className='dropdown__list-item'
              >
                <Link
                  // По клику присваиваем activeLink = item.id
                  onClick={toggleDropdownHide}
                  // Если ссылки нет то по умолчанию '/'
                  to={item.link ? item.link : '/'}
                  // меняем класс на active если activeLink === item.id
                  className={activeLink === item.id ? "header__active-link" : ""}
                >
                  {item.title}
                </Link>
              </li>
            )
          }
        </ul>
        </div>
    </>
  );
};

export default DropdownList;
