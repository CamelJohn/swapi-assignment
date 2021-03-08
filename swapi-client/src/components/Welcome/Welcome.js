
import css from './Welcome.module.css';
import { useEffect } from 'react';
import useGetData from '../../hooks/useGetData.js';

const Welcome = () => {
  const [timer, cachedData, getData, text, setText] = useGetData('scroll-text');
  
  useEffect(() => {
    let secondTimer;

    if (!cachedData) {
      (async () => await getData())();
    } else {
      secondTimer = setTimeout(() => setText(JSON.parse(cachedData)), 1000)
    }

    return () => {
      clearTimeout(timer)
      clearTimeout( secondTimer)
    };
  }, [])
  
  const renderScrollingText = () => text.map((row, idx) => <p key={idx}>{row}</p>);

  return (
    <div className={css.wrapper}>
      <div className={css.Welcome}>
        <div className={css['scroll-text']}>
          {text && <h1>Star Wars</h1>}
          {text && renderScrollingText()}
        </div>
      </div>
    </div>
    );
}
     
export default Welcome;