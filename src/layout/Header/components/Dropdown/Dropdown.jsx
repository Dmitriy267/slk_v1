import { useState } from 'react';

import './Dropdown.sass';
import DropdownButton from './DropdownButton/DropdownButton';
import DropdownList from './DropdownList/DropdownList';

const Dropdown = ({ item, handleActiveLink, activeLink, setBurgerOpened, isMain, isBurger }) => {
  // По умолчанию dropdown скрыт true
  const [dropdownHidden, setDropdownHidden] = useState(false);

  return (
    <li key={item.id} onClick={() => handleActiveLink(0)} className="dropdown__main-item">
      <DropdownButton
        title={item.title}
        setDropdownHidden={setDropdownHidden}
        dropdownHidden={dropdownHidden}
        activeLink={activeLink}
        handleActiveLink={handleActiveLink}
        isMain={isMain}
      />

      {dropdownHidden && (
        <DropdownList
        isBurger={isBurger}
          dropdownList={item.dropdown}
          activeLink={activeLink}
          handleActiveLink={handleActiveLink}
          setDropdownHidden={setDropdownHidden}
          setBurgerOpened={setBurgerOpened}
          dropdownHidden={dropdownHidden}
        />
      )}
    </li>
  );
};

export default Dropdown;
