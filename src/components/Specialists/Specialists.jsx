import SpecialistCard from '../SpecialistCard/SpecialistCard';
import './Specialists.sass';

export const Specialists = ({data}) => {

  return (
    <section className="specialists">
      {data.map((item) => (
        <SpecialistCard employee={item} key={item.last_name + Math.random()} />
      ))}
    </section>
  );
};
