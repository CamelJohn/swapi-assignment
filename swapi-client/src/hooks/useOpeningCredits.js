import { useState } from "react";
import instance from "../axios";

const useOpeningCredits = () => {
  const [text, setText] = useState('');

  let timer;
  const cachedData = localStorage.getItem('cached-credits');

  const getData = async () => {
    const { data } = await instance.get('scroll-text');
    setText(data);

    localStorage.setItem('cached-credits', JSON.stringify(data))
    console.log('If your looking for it in the network tab, your request has been cached to local storage...');
  
    timer = setTimeout(() => setText(data), 1500);
  }
  return [timer, cachedData, getData, text, setText]
}

export default useOpeningCredits;