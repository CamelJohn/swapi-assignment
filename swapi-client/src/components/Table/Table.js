import { useEffect } from 'react';
import useGetData from '../../hooks/useGetData';
import Loading from '../Loading/Loading';
import css from './Table.module.css';

const Table = () => {
  const [timer, cachedData, getData, fetching, tableData, setTableData] = useGetData('table-data');

  useEffect(() => {
    if (!cachedData) {
      (async () => await getData())();
    } else {
      setTableData(JSON.parse(cachedData));
    }

    return () => clearTimeout(timer);
  }, []);

  const renderTableData = tableData.map((row, index) => (
    <tr key={index} className={css.row}>
      <td>{row.vehicle}</td>
      <td className={css.innerCellRow}>
        {row.pilots.map((pilot, indx) => (
          <div key={indx} className={css.innerCell}>
            <div>{pilot.homeworldName}</div>{' '}
            <div>{pilot.homeworldPopulation}</div>
          </div>
        ))}
      </td>
      <td>
        <div className={css.innerCellRow}>
          {row.pilots.map((pilot, idx) => (
            <div key={idx}>{pilot.pilotName}</div>
          ))}
        </div>
      </td>
      <td>{row.totalPopulation}</td>
    </tr>
  ));

  if (!fetching) {
    return (
      <div className={css.Table}>
        {
          <table>
            <thead>
              <tr>
                <th>Vehicle Name</th>
                <th>Planets & Total population</th>
                <th>Pilot Names</th>
                <th>Total Population</th>
              </tr>
            </thead>
            <tbody>
             {renderTableData}
            </tbody>
          </table>
        }
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default Table;
