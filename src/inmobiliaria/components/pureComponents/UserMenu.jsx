import { useState } from "react";
import { ProfileIcon, LogoutIcon } from "../svg/IconUserMenu";
import "../../css/UserMenu.css";

export const UserMenu = ({ logout, navigate, user }) => {
  const [open, setOpen] = useState(false);

  const renderDropdown = () => {
    if (!open) return null;

    return (
      <div className="dropdown">
        <div className="user-info">
          {user?.name || "Usuario"}
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            logout();
            navigate("/", { replace: true });
          }}
        >
          <LogoutIcon size={18} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    );
  };

  return (
    <div className="user-menu">
      {/* BOTÓN PERFIL */}
      <button onClick={() => setOpen(!open)}>
        <ProfileIcon size={24} />
      </button>

      {/* MENU */}
      {renderDropdown()}
    </div>
  );
};