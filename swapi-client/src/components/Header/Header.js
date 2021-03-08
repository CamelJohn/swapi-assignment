import { NavLink } from 'react-router-dom';
import css from './Header.module.css';

const Header = () => {
  
  return (
    <div className={css.Header}>
      <div className={css.logo}>(Tikal) SwApi</div>
      <div className={css.links}>
        <NavLink activeClassName={css.active} exact={true} to="/">Opening Credits</NavLink>
        <NavLink activeClassName={css.active} exact={true} to="/chart">Chart</NavLink>
        <NavLink activeClassName={css.active} exact={true} to="/table">Table</NavLink>
      </div>
    </div>
    );
}
     
export default Header;