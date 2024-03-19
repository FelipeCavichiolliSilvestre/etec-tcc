import Grid from '@mui/material/Unstable_Grid2/Grid2';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PaginationItem from '@mui/material/PaginationItem';
import Typography from '@mui/material/Typography';

function GridItem(props) {
  return (
    <Grid
      sx={{ display: 'flex' }}
      xs={3}
      alignItems="center"
      justifyContent="center"
      {...props}
    />
  );
}

function Pagination({
  currentPage,
  disable,
  disableLeft,
  disableRight,
  onNext,
  onPrev,
}) {
  return (
    <Grid container sx={{ minHeight: '100%' }}>
      <GridItem>
        <IconButton disabled={disableLeft || disable} onClick={onPrev}>
          <KeyboardArrowLeftIcon />
        </IconButton>
      </GridItem>

      <GridItem xs={6}>
        <PaginationItem
          disabled={disable}
          page={<Typography fontSize={20}>{currentPage}</Typography>}
        />
      </GridItem>

      <GridItem>
        <IconButton disabled={disableRight || disable} onClick={onNext}>
          <KeyboardArrowRightIcon />
        </IconButton>
      </GridItem>
    </Grid>
  );
}

export default Pagination;
