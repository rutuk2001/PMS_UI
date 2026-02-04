import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  content,
}) {
  const handleClose = () => {
    onClose?.();
  };

  const handleDelete = () => {
    onConfirm?.(); // 🔥 call parent logic
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title || "Are you sure?"}</DialogTitle>

      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ width: 342 }}>
        <DialogContentText color="text.primary">
          {content ||
            "Are you sure you want to delete? Once deleted, you will not be able to retrieve it."}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleDelete}
            >
              DELETE
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" fullWidth onClick={handleClose}>
              CANCEL
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
