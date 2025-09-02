import "./styles/link.scss";
import { NavLink } from "react-router-dom";

interface CusLinkProps {
  href: string;
  label: string;
  className?: string;
}

const CusLink = ({ label, href, className }: CusLinkProps) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }: { isActive: boolean }) =>
        `cus-link ${className ? className : ""} ${isActive ? "active" : ""}`
      }
    >
      {label}
    </NavLink>
  );
};

export default CusLink;
