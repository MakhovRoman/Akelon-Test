import { Typography } from '@mui/material'
import styles from './App.module.scss';
import { Card } from '../card';

export const App = () => {
  return (
    <main className={styles.main}>
      <Typography gutterBottom variant='h2'>Profile Card</Typography>
      <Card />
    </main>
  )
}
