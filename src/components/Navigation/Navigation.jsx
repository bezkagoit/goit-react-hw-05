import clsx from "clsx";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const getNavLinkClassNames = ({ isActive }) =>
  clsx(css.headerLink, {
    [css.active]: isActive,
  });

const Navigation = () => {
  return (
    <div>
      <header>
        <NavLink className={getNavLinkClassNames} to="/">
          Home
        </NavLink>
        <NavLink className={getNavLinkClassNames} to="/movies">
          Movies
        </NavLink>
      </header>
    </div>
  );
};

export default Navigation;
