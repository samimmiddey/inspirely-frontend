import Box from "@mui/material/Box";

const Spinner = () => {
   return (
      <Box sx={{ backgroundColor: 'bg.white' }} className="spinner-container">
         <div className="spinner-main">
            <span className="spinner"></span>
            <div className="spinner-inner"></div>
         </div>
      </Box>
   );
};

export default Spinner;
