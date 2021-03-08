import { useState } from "react";
import instance from "../axios";

const useTableData = () => {
  const [tableData, setTableData] = useState([]);
  const [fetching, setFetching] = useState(false);
  
  let timer;
  const cachedData = localStorage.getItem('cached');
  const getData = async () => {
    setFetching(true);
  
    const { data } = await instance.get('/table-data');
  
    localStorage.setItem('cached', JSON.stringify(data))
    console.log('If your looking for it in the network tab, your request has been cached to local storage...');
  
    timer = setTimeout(() => {
      setTableData(data);
      setFetching(false);
    }, 1500);
  };

  return [timer, cachedData, getData, fetching, tableData, setTableData];
}

export default useTableData;