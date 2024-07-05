import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';


// Create a theme instance
const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        // Style applied to the label
        root: {
          '&.Mui-focused': {
            color: '#F15A29',
          },
        },
      },
    },
    // Name of the component
    MuiOutlinedInput: {
      styleOverrides: {
        // Apply styles for the root element
        root: {
          // Style applied when the input is focused
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#F15A29', // Set the color you want here
          },
        },
      },
    },
  },
});

interface BasicTextFieldOutlineProps {
  label: string;
  value: string;
  set: (s:string) => void;
  placeholder?: string;}

const BasicTextFieldOutline :  React.FC<BasicTextFieldOutlineProps> = ({label,value,set,placeholder}) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 0, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <ThemeProvider theme={theme}>
        <TextField fullWidth id="margin-none"  label={label} variant="outlined"  value={value} 
                  onChange={(event) => set( event.target.value)}  placeholder={placeholder}
        />
      </ThemeProvider>
    </Box>
  );
}

export default BasicTextFieldOutline