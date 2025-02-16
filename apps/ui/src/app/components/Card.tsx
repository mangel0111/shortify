import { Card, styled } from '@mui/material';

const PanelCard = styled(Card)(({ theme }) => ({
  width: '300px',
  margin: '20px auto',
  padding: theme.spacing(3),
}));

export default PanelCard;
