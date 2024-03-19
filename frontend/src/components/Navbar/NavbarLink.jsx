import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

function NavbarLink({ children, href, ...LinkProps }) {
  const navigate = useNavigate();

  return (
    <Link
      onClick={() => navigate(href)}
      underline="hover"
      variant="h6"
      mx={2}
      {...LinkProps}
    >
      {children}
    </Link>
  );
}

export default NavbarLink;
