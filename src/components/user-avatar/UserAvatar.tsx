import { Avatar } from "@mui/material"
import styles from './UserAvatar.module.scss'
import { ChangeEvent, useEffect, useState } from "react"

export const UserAvatar = () => {
  const [avatar, setAvatar] = useState<string>('');

  const reader = new FileReader();

  const handleClick = () => {
    const input = document.getElementById('load_avatar');
    input && input.click();
  }

  const handleLoad = () => {
    const result = reader.result as string;
    setAvatar(result);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // get target Event
    const target = event.target as HTMLInputElement;
    // get loaded file
    const file = (target.files as FileList)[0];
    // read loaded file as DataURL
    reader.readAsDataURL(file);
    // add listener for preview
    reader.addEventListener('load', handleLoad);
  }

  // remove listener when component will unmount
  useEffect(() => {
    return reader.removeEventListener('load', handleLoad)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      onClick={handleClick}
      className={styles.avatar}
    >
      <input
        id="load_avatar"
        type="file"
        accept="image/png, image/jpeg"
        className={styles.avatar__input}
        onChange={event => handleChange(event)}
      />
      <Avatar
        alt='avatar'
        src={avatar}
        sx={{
          width: 80,
          height: 80
        }}
      />
    </div>
  )
}
