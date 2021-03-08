import css from './Bar.module.css';

const Bar = ({ name, population, total }) => {
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
