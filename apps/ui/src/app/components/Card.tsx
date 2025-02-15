import { Card, styled } from '@mui/material';

const FormCard = styled(Card)(({ theme }) => ({
  width: '300px',
  margin: '20px auto',
  padding: theme.spacing(3),
}));

export default FormCard;
