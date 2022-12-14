import { Grid, Skeleton } from '@mui/material';
const ListSkeleton = () => {
  return (
    <Grid container spacing={2}>
      {/* Row 1 */}
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Skeleton variant="text" />
      </Grid>
      <Grid item xs={1} />
      {/* Row 2 */}
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Skeleton variant="text" />
      </Grid>
      <Grid item xs={1} />
      {/* Row 3 */}
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Skeleton variant="text" />
      </Grid>
      <Grid item xs={1} />
      {/* Row 4 */}
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Skeleton variant="text" />
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

ListSkeleton.defaultProps = {};

ListSkeleton.propTypes = {};

export default ListSkeleton;
