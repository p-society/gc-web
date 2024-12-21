import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function NavUpgrade() {

  return (
    <Stack
      sx={{
        px: 2,
        py: 2,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Stack spacing={0.5} sx={{ mb: 1, mt: 1, width: 1 }}>
          <Typography variant="subtitle2" noWrap sx={{ display: 'flex', justifyContent: 'center', mt: '"auto"' }}>
            Powered by <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} component="a"
              href="https://gsoubhik.netlify.app/" target="_blank"><Box component="img" alt="GCB"
                src={'/psoc_logo.png'}
                sx={{
                  height: 25,
                  width: 'auto',
                  ml: '8px'
                }} /></Box>
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
