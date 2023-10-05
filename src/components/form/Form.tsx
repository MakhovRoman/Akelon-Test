import { mockAPI } from "@/services/api/mockAPI"
import { UserData, UserLocalParam, UserParam } from "@/types/localData"
import { conditionLocalCityData, conditionLocalUserData } from "@/utils/conditionData"
import { getLocalCityData, getLocalStorageData } from "@/utils/getLocalStorageData"
import { setLocalStorageData } from "@/utils/setLocalStorageData"
import { Box, Button, Container, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react"

export const Form = () => {
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
  const cityList = Object.values(mockAPI.getCities());

  const toggleFormState = () => setFormActive(!formActive);

  // Handler for change user data
  const handleUserChange = (param: UserParam, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newData = {...userData}
    const value = e.target.value
    setUserData({...newData, [param]: value})
  }

  // Handler for change city data
  const handleCityChange = (e: SelectChangeEvent) => {
    setCity(e.target.value as string)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
        <TextField
          fullWidth
          value={userData.first_name || ''}
          onChange={(e) => handleUserChange('first_name', e)}
          disabled={formActive}
          variant='outlined'
          label='FirstName'
          margin='normal'
        />
        <TextField
          fullWidth
          value={userData.last_name || ''}
          onChange={(e) => handleUserChange('last_name', e)}
          disabled={formActive}
          variant='outlined'
          label='LastName'
          margin='normal'
        />
        <TextField
          fullWidth
          value={userData.summary || ''}
          onChange={(e) => handleUserChange('summary', e)}
          disabled={formActive}
          variant='outlined'
          label='Summary'
          margin='normal'
          multiline
        />
        <Box sx={{minWidth: 120}}>
          <InputLabel>Select city</InputLabel>
          <Select
            value={city}
            onChange={e => handleCityChange(e)}
            autoWidth
            disabled={formActive}
          >
            {cityList.map(item => <MenuItem value={item} key={item}>{item}</MenuItem>)}
          </Select>
        </Box>
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
  )
}
