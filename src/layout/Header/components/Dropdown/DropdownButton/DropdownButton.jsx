import './DropdownButton.sass';

const DropdownButton = ({
  id,
  title,
  handleActiveLink,
  activeLink,
  dropdownHidden,
  setDropdownHidden,
  isMain
}) => {
  const toggleDropdownHide = () => {
    handleActiveLink(id);
    setDropdownHidden(state => !state);
  };
  return (
    <div >
      <button
        // По клику присваиваем activeLink = id
        onClick={toggleDropdownHide}
        className={`${activeLink ? 'dropdown__btn active' : 'dropdown__btn'} ${
          isMain && 'dropdown__btn_status_main'
        }`}
      >
        <span className="dropdown__btn-title">{title}</span>
        <svg
          className={`${!dropdownHidden ? '' : 'dropdown__arrow_opened'}`}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.229184 0.225519C0.372228 0.0880472 0.564059 0.0129274 0.762522 0.0166679C0.960985 0.0204084 1.14984 0.102703 1.28759 0.245467L4.99202 4.17324L8.69645 0.245467C8.76379 0.171316 8.84534 0.11142 8.93627 0.0693285C9.0272 0.0272372 9.12567 0.00380733 9.22584 0.000426662C9.326 -0.00295401 9.42583 0.0137832 9.5194 0.0496473C9.61297 0.0855114 9.69838 0.139773 9.77058 0.209215C9.84277 0.278657 9.90027 0.361868 9.93968 0.453917C9.97909 0.545966 9.9996 0.64498 9.99999 0.745092C10.0004 0.845204 9.98067 0.944377 9.94199 1.03673C9.90331 1.12909 9.84647 1.21276 9.77483 1.28277L5.53121 5.77108C5.46135 5.84348 5.3776 5.90106 5.28496 5.94039C5.19232 5.97973 5.09268 6 4.99202 6C4.89136 6 4.79173 5.97973 4.69908 5.94039C4.60644 5.90106 4.52269 5.84348 4.45283 5.77108L0.209214 1.28277C0.0715912 1.13988 -0.00361115 0.948259 0.00013343 0.750014C0.00387802 0.551769 0.0862632 0.363118 0.229184 0.225519Z"
            fill="#232323"
          />
        </svg>
      </button>
    </div>
  );
};

export default DropdownButton;
