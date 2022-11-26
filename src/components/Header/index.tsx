import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./styles.module.css";
import { FiExternalLink } from "react-icons/fi";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const userHasImage = user?.images?.length;

  const toggleMenuIsOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header-bar">
      <img className="logo" src="https://iili.io/H3S72g1.png" alt="Logo" />
      <div className={styles.login}>
        <span>{user?.display_name}</span>
        <img
          src={userHasImage ? user.images[0].url : "https://iili.io/HFo57qv.png"}
          alt="Login"
          onClick={toggleMenuIsOpen}
        />
        {isMenuOpen && (
          <div>
            <a href={user?.external_urls.spotify} target="_blanc">
              Conta
              <FiExternalLink />
            </a>
            <button onClick={logout}>Sair</button>
          </div>
        )}
      </div>
    </header>
  );
}
