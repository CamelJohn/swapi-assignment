import css from './Chart.module.css';

import { useEffect } from 'react';
import useGetData from '../../hooks/useGetData';

import Bar from './Bar/Bar';
import Loading from '../Loading/Loading';

const Chart = () => {
  const [timer, getData, planets, total] = useGetData('chart-data');

  useEffect(() => {
    (async () => {
      await getData();
    })();

    return () => clearTimeout(timer);
  }, []);

  if (planets && total) {
    return (
      <div className={css.Chart}>
        {planets.map(({ name, population }, index) => (
          <Bar key={index} name={name} population={population} total={total} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <Loading />
      </div>
    );
  }
};

export default Chart;
