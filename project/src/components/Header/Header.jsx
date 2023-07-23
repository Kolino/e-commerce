import style from "./Header.module.scss";

const Header = () => {
  return (
    <header className={style.header}>
      <h1 className={style.header__main_heading}>Kol's Online Grocer</h1>
      <h3 className={style.header__subheading}>Only the freshest foods...</h3>
    </header>
  )
}
export default Header;