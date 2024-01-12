import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import SearchBar from "../SearchBar/SearchBar.jsx";
import PropTypes from "prop-types";
import DropdownMenu from "../DropdownMenu.jsx";
import { UserContext } from "../../UserContext.jsx";
import { useContext } from "react";

export function Header({ setSearchTerm }) {
  const { isLoggedIn, logout } = useContext(UserContext);
  const location = useLocation();

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const onLogout = () => {
    logout();
    console.log("User logged out");
  };

  const isLandingPage = location.pathname === "/Home";

  return (
    <>
      <header className={styles.headerContainer}>
        <nav className={styles.navbar}>
          <div className={styles.logoContainer}>
            <Link to="/">
              <img
                className={styles.logo}
                src="/Luna Link Logo.svg"
                alt="Logo"
              />
            </Link>
          </div>
          <Link to="/Home" className={styles.homeBtn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clipPath="url(#clip0_45_1302)">
                <path
                  d="M19.3442 7.5198L10.8802 0.339514C10.6391 0.121018 10.3254 0 10 0C9.67467 0 9.36095 0.121018 9.11988 0.339514L0.656787 7.5199C0.450131 7.70713 0.284971 7.93555 0.171936 8.19047C0.0589015 8.44538 0.000499142 8.72115 0.000488281 9L0.000488281 19.3357C0.000488279 19.5119 0.0704607 19.6808 0.195019 19.8054C0.319578 19.93 0.488525 20 0.664691 20L6.00049 20C6.55277 20 7.00049 19.5523 7.00049 19V15C7.00049 14.436 7.55258 13.9788 8.11678 13.9788H11.8833C12.4476 13.9788 13.0005 14.436 13.0005 15V19C13.0005 19.5523 13.4482 20 14.0005 20H19.3363C19.5125 20 19.6814 19.93 19.806 19.8054C19.9305 19.6808 20.0005 19.5119 20.0005 19.3357V9C20.0004 8.72114 19.942 8.44537 19.829 8.19044C19.716 7.93551 19.5508 7.70707 19.3442 7.5198Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_45_1302">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
          {isLandingPage && (
            <div className={styles.centerSearch}>
              <SearchBar onSearch={handleSearch} placeholder="Search here..." />
            </div>
          )}
          {isLoggedIn && (
            <div className={styles.additionalContent}>
              <div className={styles.notifyBox}>
                <DropdownMenu onLogout={onLogout} />
              </div>
              <div className={styles.userContent}>
                <img
                  className={styles.userimg}
                  src="/images/Memoji Boys 2-1.png"
                  alt="User Avatar"
                />
                <h6 className={styles.text}>Emil</h6>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M14 6H6C5.17595 6 4.70557 6.94076 5.2 7.6L9.2 12.9333C9.6 13.4667 10.4 13.4667 10.8 12.9333L14.8 7.6C15.2944 6.94076 14.824 6 14 6Z"
                    fill="#F4F6F8"
                  />
                </svg>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}

Header.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
};
