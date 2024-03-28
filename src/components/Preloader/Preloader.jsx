import './Preloader.sass';

export const Preloader = () => {
  return (
    <div className="preloader__container">
      <div className="preloader__circle preloader__circle-1" />
      <div className="preloader__circle preloader__circle-2" />
      <div className="preloader__circle preloader__circle-3" />
      <div className="preloader__circle preloader__circle-4" />
      <div className="preloader__circle preloader__circle-5" />
    </div>
  );
};
