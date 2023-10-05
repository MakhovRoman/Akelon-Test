import styles from './Card.module.scss';
import { Form } from '../form';
import { UserAvatar } from '../user-avatar';

export const Card = () => (
  <div className={styles.card}>
    <UserAvatar />
    <Form/>
  </div>
)
