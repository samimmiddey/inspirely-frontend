import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

const CustomSelectBox = ({ title, name, categoryValue, setCategoryValue, categories, register, errors }) => {
   return (
      <FormControl variant='standard' color='secondary' sx={{ padding: '5px 0' }}>
         <InputLabel sx={{ color: 'text.secondary' }}>{title}</InputLabel>
         <Select
            value={categoryValue}
            label='Category'
            name={name}
            {...register(name, {
               required: true,
               onChange: e => setCategoryValue(e.target.value)
            })}
            error={errors[name] ? true : false}
            MenuProps={{
               PaperProps: { sx: { maxHeight: '400px' } },
               sx: {
                  '&& .Mui-selected': {
                     backgroundColor: '#3366cc25'
                  },
                  '&& .Mui-selected:hover': {
                     backgroundColor: '#3366cc25'
                  }
               }
            }}
         >
            <MenuItem value=''>None</MenuItem>
            {categories.map((item, index) => (
               <MenuItem
                  key={index}
                  value={item.text.toLowerCase()}
               >
                  {item.text}
               </MenuItem>
            ))}
         </Select>
         <Typography
            sx={{
               textAlign: 'start',
               fontSize: '13px',
               marginTop: '4px',
               fontWeight: 600,
               color: 'primary.main'
            }}
         >
            {errors[name]?.message}
         </Typography>
      </FormControl>
   );
};

export default CustomSelectBox;