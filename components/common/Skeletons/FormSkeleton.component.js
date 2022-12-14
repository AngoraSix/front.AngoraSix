import { Grid, Skeleton } from '@mui/material';
const FormSkeleton = () => {
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
        <Skeleton variant="rectangular" height={150} />
      </Grid>
      <Grid item xs={1} />
      {/* Row 3 */}
      <Grid item xs={1} sx={{ display: { xs: 'none', sm: 'block' } }} />
      <Grid item xs={5} sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Skeleton variant="rectangular" height={150} />
      </Grid>
      <Grid item xs={5} sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Skeleton variant="rectangular" height={150} />
      </Grid>
      <Grid item xs={1} sx={{ display: { xs: 'none', sm: 'block' } }} />
      {/* Row 4 */}
      <Grid item xs={8} sm={7} md={9} />
      <Grid item xs={3} sm={2} md={1}>
        <Skeleton variant="rectangular" height={40} />
      </Grid>
      <Grid item sm={2} md={1} sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Skeleton variant="rectangular" height={40} />
      </Grid>
    </Grid>
  );
};

FormSkeleton.defaultProps = {};

FormSkeleton.propTypes = {};

export default FormSkeleton;
