import { useState } from "react";
import instance from "../axios";

const useFetchCharts = () => {
  const [planets, setPlanets] = useState([]);
  const [total, setTotal] = useState(0);
  
  let timer;
  const getData = async () => {
    const { data } = await instance.get('chart-data');

    timer = setTimeout(() => {
      setPlanets(data.planets);
      setTotal(data.total);
    }, 1500);  
  }

  return [timer, getData, planets, total];
}

export default useFetchCharts;