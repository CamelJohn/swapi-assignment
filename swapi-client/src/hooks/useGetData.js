import { useState } from "react";
import instance from "../axios";

/**
 * @description This is a very clunky attempt at code reusabilitiy.
 * I got stressed, and confused - so i just left it like this.
 * If i would not be flustered I would have imported the other hooks, and fixed the error that happens when you return them
 * inside ot the switch case, I'm not frontend expret but it seems to me that the order of the array being sent back by the hook
 * matters as a whole to the hook.
 * 
 * the 'instance' uses axios under the hood and calls a nodejs server that i spun up to handle the formatting of requests to SWAPI
 * (found it to be much easyer for me).
 */

const useGetData = module => {
  const [planets, setPlanets] = useState([]);
  const [total, setTotal] = useState(0);
  const [text, setText] = useState('');
  const [tableData, setTableData] = useState([]);
  const [fetching, setFetching] = useState(false);

  let timer;
  const cachedData = localStorage.getItem(`cached-${module}`);
  const log = () => console.log('If your looking for it in the network tab, your request has been cached to local storage...');
  let getData;

  switch (module) {
    case 'chart-data': getData = async () => {
      const { data } = await instance.get(module);
  
      timer = setTimeout(() => {
        setPlanets(data.planets);
        setTotal(data.total);
      }, 1500);
    }
    return [timer, getData, planets, total]
    case 'scroll-text': getData = async () => {
      const { data } = await instance.get(module);
      setText(data);
  
      localStorage.setItem('cached-credits', JSON.stringify(data))
      log();
    
      timer = setTimeout(() => setText(data), 1500);
    }
    return [timer, cachedData, getData, text, setText]
    case 'table-data': getData = async () => {
    setFetching(true);
  
    const { data } = await instance.get(module);
  
    localStorage.setItem(`cached-${module}`, JSON.stringify(data))
    log();
  
    timer = setTimeout(() => {
      setTableData(data);
      setFetching(false);
    }, 1000);
  };
  return [timer, cachedData, getData, fetching, tableData, setTableData];
  }
}

export default useGetData;