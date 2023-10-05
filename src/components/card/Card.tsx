import { Avatar, Box, Button, Container, TextField } from '@mui/material';
import styles from './Card.module.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { setLocalStorageData } from '@/utils/setLocalStorageData';
import { getLocalCityData, getLocalStorageData } from '@/utils/getLocalStorageData';
import { conditionLocalCityData, conditionLocalUserData } from '@/utils/conditionData';
import { UserData, UserLocalParam, UserParam } from '@/types/localData';

export const Card = () => {
  const defaultUserData: UserData = {
    first_name: '',
    last_name: '',
    summary: ''
  }

  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [city, setCity] = useState<string>('')

  const [formActive, setFormActive] = useState<boolean>(true);

  const fieldList: UserLocalParam[] = [
    'akelon_first_name',
    'akelon_last_name',
    'akelon_summary'
  ]

  const toggleFormState = () => setFormActive(!formActive);

  const handlerChange = (param: UserParam, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newData = {...userData}
    const value = e.target.value
    setUserData({...newData, [param]: value})
  }

  const handlerSubmit = () => {
    // Set values for all user-fields at localStorage
    Object.keys(userData).forEach((item) => {
      setLocalStorageData(item as UserParam, userData[item as UserParam])
    });
    // Set city at localStorage
    setLocalStorageData('city', city)

    toggleFormState();
  };

  useEffect(() => {
    // Get localStorage data
    const localUserData = getLocalStorageData(...fieldList);
    const localCity = getLocalCityData('akelon_city');

    // Get current user data
    const newUserData = Object.keys(userData).reduce((obj, item, index) => {
      return {...obj, [item]: conditionLocalUserData(localUserData, fieldList[index] as UserLocalParam)}
    }, {} as UserData);
    // Get current city data
    const newCity = conditionLocalCityData(localCity);

    // Set current data
    setUserData({...newUserData});
    setCity(newCity)
  }, [])


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
      <Container>
        <TextField
          fullWidth
          value={userData.first_name || ''}
          onChange={(e) => handlerChange('first_name', e)}
          disabled={formActive}
          variant='outlined'
          label='FirstName'
          margin='normal'
        />
        <TextField
          fullWidth
          value={userData.last_name || ''}
          onChange={(e) => handlerChange('last_name', e)}
          disabled={formActive}
          variant='outlined'
          label='LastName'
          margin='normal'
        />
        <TextField
          fullWidth
          value={userData.summary || ''}
          onChange={(e) => handlerChange('summary', e)}
          disabled={formActive}
          variant='outlined'
          label='Summary'
          margin='normal'
          multiline
        />
        <Container sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '50px',
          width: '100%'
        }}>
          <Button
            onClick={toggleFormState}
            variant='contained'
            disabled={!formActive}
            size='large'
          >
            Edit
          </Button>
          <Button
            variant='contained'
            disabled={formActive}
            size='large'
            onClick={() => handlerSubmit()}
          >
            Save
          </Button>
        </Container>
      </Container>
    </div>
  )
}
