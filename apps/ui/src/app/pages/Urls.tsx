import {
  Box,
  List,
  ListItem,
  Stack,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';

import PageContainer from '../components/Container';
import PanelCard from '../components/Card';
import { purple } from '@mui/material/colors';
import { useGetShortUrls } from '../hooks/shortUrl';

const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export const UrlPanel = () => {
  const { shortUrls } = useGetShortUrls();
  return (
    <PageContainer>
      <PanelCard>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Urls shortened by me:
        </Typography>
        <Container>
          <List>
            {shortUrls?.map((item) => (
              <ListItem key={item.id} alignItems="flex-start">
                <Box>
                  <Stack>
                    <Tooltip title={item.attributes.originalUrl}>
                      <Typography
                        variant="subtitle2"
                        component={'a'}
                        color={purple[800]}
                        href={item.attributes.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.attributes.shortUrl}
                      </Typography>
                    </Tooltip>
                    <Typography variant="caption">
                      Clicks: {item.attributes.clicks}
                    </Typography>
                    <Typography variant="caption">
                      Created At: {item.attributes.createdAt}
                    </Typography>
                  </Stack>
                </Box>
              </ListItem>
            ))}
          </List>
        </Container>
      </PanelCard>
    </PageContainer>
  );
};
