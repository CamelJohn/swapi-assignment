import css from './App.module.css';
import { Route, BrowserRouter } from 'react-router-dom';

import Chart from './Chart/Chart';
import Table from './Table/Table';
import Welcome from './Welcome/Welcome';
import Header from './Header/Header';

const App = () => {
  return (
    <div className={css.App}>
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={Welcome}></Route>
        <Route exact path="/table" component={Table} />
        <Route exact path="/chart" component={Chart} />
      </BrowserRouter>
    </div>
  );
};

export default App;
