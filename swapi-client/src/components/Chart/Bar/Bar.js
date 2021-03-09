import css from './Bar.module.css';

const Bar = ({ name, population, total }) => {
  // the math should be correct (in the backend i summed up all the populations) but visually something is a little off 
  // when you look at the 100,000's...

  const height = (population / total) * 100 + 200;
  
  return (
    <div className={css.BarWrapper}>
      <div className={css.Bar} style={{ height: `${height}px` }}>
        <div className={css.Popultaion}>{population}</div>
      </div>
      <div className={css.Label}>{name}</div>
    </div>
  );
};

export default Bar;
