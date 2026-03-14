import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "../../css/modalPopUp.css"

export function DialogModal({description,open,setOpen,typePopUp}) {
  
  const styleColor = typePopUp=="ERROR"?"red":"green"
  const colorFont = typePopUp=="ERROR"?"red-color-font":"green-color-font"

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={()=> setOpen(!open)}
        aria-labelledby="draggable-dialog-title"
        className={`dialog`}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title"
            className={`${styleColor}`}
        >
         
            {typePopUp}
        </DialogTitle >
        <DialogContent
        className={`${styleColor}
             ${colorFont}
        `}
        >
          <DialogContentText
            className={`
            ${colorFont}
       `}
          >
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions
            className={`${styleColor}`}
        >
          <Button onClick={()=> setOpen(open)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
