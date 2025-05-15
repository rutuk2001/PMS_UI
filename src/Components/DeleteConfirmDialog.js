import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function DeleteConfirmDialog({ open, onClose, onDelete }) {
  const handleClose = () => {
    onClose && onClose();
  };

  const handleDelete = () => {
    onDelete && onDelete();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-confirm-dialog-title"
      aria-describedby="delete-confirm-dialog-description"
    >
      <DialogTitle id="delete-confirm-dialog-title">Are you sure?</DialogTitle>
      <IconButton
        className="MuiIconButton-close"
        aria-label="close"
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        sx={{ width: "342px", maxWidth: "100%", boxSizing: "border-box" }}
      >
        <DialogContentText
          id="delete-confirm-dialog-description"
          color="text.primary"
        >
          Are you sure you want to delete? <br /> Once deleted, you will not be
          able to retrieve it.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Grid container direction="row" spacing={3}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleDelete}
            >
              DELETE
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleClose}
            >
              CANCEL
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmDialog;
