import { Avatar, Box } from '@mui/material';
import styles from './Card.module.scss';
import { mockAPI } from '@/services/api/mockAPI';


export const Card = () => {
  mockAPI.getUser();
  mockAPI.getCities();

  return (
    <div className={styles.card}>
      <Box>
        <Avatar
          alt='avatar'
          sx={{
            width: 80,
            height: 80
          }}
        />
      </Box>

      Card
    </div>
  )
}
