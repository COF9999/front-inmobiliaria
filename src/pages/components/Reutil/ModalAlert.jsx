import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "../../css/popUp/modalPopUp.css"

export function DialogModal({description,setView,typePopUp}) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    setView()
  };

  const styleColor = typePopUp=="ERROR"?"red":"green"
  const colorFont = typePopUp=="ERROR"?"red-color-font":"green-color-font"

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
