import SettingsIcon from '@mui/icons-material/Settings';

import { useState } from 'react';
// import { useAuth } from '@contexts/AuthContext';

import AvatarMenu from './ConfigMenu';
import { IconButton } from '@mui/material';

function ProfileAvatar() {
  // const { user } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  return (
    <>
      <IconButton
        onClick={(event) => {
          setMenuOpen(true);
          setMenuAnchor(event.currentTarget);
        }}
      >
        <SettingsIcon />
      </IconButton>

      <AvatarMenu
        open={menuOpen}
        anchorEl={menuAnchor}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}

export default ProfileAvatar;
