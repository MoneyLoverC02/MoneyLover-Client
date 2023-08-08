import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';

export default function FreeSolo() {
  const allWallet = useSelector(state => state.wallet.allWallet);
  const [dataForm, setDataForm] = React.useState({idWallet: null, amountOfMoney: 0});

  const handleChange = () => {

  }
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        freeSolo ={false}
        id="free-solo-2-demo"
        disableClearable
        options={allWallet.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            fullWidth
            {...params}
            label="Search name of wallet"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
            name = 'name'
            value = {dataForm.idWallet}
            onChange = {handleChange}
          />
        )}
      />
    </Stack>
  );
}