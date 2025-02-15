import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { green, purple } from '@mui/material/colors';

import { CopyButton } from '../components/CopyButtons';
import { CreateShortUrlFormIDs } from './constants';
import { FC } from 'react';
import FormCard from '../components/Card';
import PageContainer from '../components/Container';
import { useUrlShortener } from '../../hooks/shortUrlHooks';

const CreateShortUrlForm: FC = () => {
  const { urlState, setUrlState, shortenUrl, copyToClipboard } =
    useUrlShortener();

  return (
    <PageContainer>
      <FormCard>
        <Typography
          data-testid={CreateShortUrlFormIDs.title}
          variant="h6"
          marginBottom={2}
          gutterBottom
        >
          URL Shortener
        </Typography>
        <Typography variant="subtitle1" marginBottom={1}>
          Enter the URL to shorten
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => e.preventDefault()}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <FormControl>
            <Typography variant="subtitle2">URL</Typography>
            <TextField
              inputProps={{
                'data-testid': CreateShortUrlFormIDs.longUrlInput,
              }}
              error={Boolean(urlState.error)}
              helperText={urlState.error}
              type="url"
              name="url"
              autoFocus
              required
              fullWidth
              variant="outlined"
              value={urlState.longUrl}
              size="small"
              color={urlState.error ? 'error' : 'primary'}
              margin="dense"
              onChange={(e) =>
                setUrlState((prev) => ({ ...prev, longUrl: e.target.value }))
              }
            />
            <Button
              data-testid={CreateShortUrlFormIDs.shortenButton}
              sx={{
                width: '85px',
                backgroundColor: purple[800],
                textTransform: 'none',
              }}
              variant="contained"
              onClick={shortenUrl}
            >
              Shorten
            </Button>
          </FormControl>
        </Box>
        {urlState.shortUrl && (
          <Box marginTop={2}>
            <Typography variant="subtitle1" gutterBottom color={green[500]}>
              Success! Here's your short URL:
            </Typography>
            <Box marginTop={1} display="flex" alignItems="center">
              <Typography
                variant="subtitle2"
                component={'a'}
                color={purple[800]}
                href={urlState.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={CreateShortUrlFormIDs.shortUrlText}
              >
                {urlState.shortUrl}
              </Typography>
              <CopyButton
                data-testid={CreateShortUrlFormIDs.copyUrlButton}
                isCopied={urlState.isCopied}
                onCopy={copyToClipboard}
              />
            </Box>
          </Box>
        )}
      </FormCard>
    </PageContainer>
  );
};

export default CreateShortUrlForm;
