import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Protect from './Protect';

function DividerAddFab(props) {
  return (
    <>
      {/* <Protect role="ADMIN"> */}
      <Divider textAlign="right">
        <Fab variant="extended" size="medium" color="primary" {...props}>
          <AddIcon sx={{ mr: 1 }} />
          <Typography>Adicionar</Typography>
        </Fab>
      </Divider>
      {/* </Protect> */}

      {/* <Protect role="PROFESSOR">
        <Divider />
      </Protect> */}
    </>
  );
}

export default DividerAddFab;
