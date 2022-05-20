import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import MuiDialogContent from "@material-ui/core/DialogContent"
import MuiDialogActions from "@material-ui/core/DialogActions"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"
import { Link } from "@material-ui/core"

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  dialogPaper: {
    minHeight: '50vh',
    maxHeight: '50vh',
},
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)


 const  ShowDocumentsDialog = ({
  open,
  setOpen,
  documentsToDisplay,
  classes
}) =>{
  console.log(documentsToDisplay)

  return (
    <div>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth="lg"
        classes={{ paper: classes.dialogPaper }}
        //  style={{width: "50vw", height: "50vh",}}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => setOpen(false)}
        >
          Ficher(s) PDF
        </DialogTitle>
        <DialogContent dividers>
          {documentsToDisplay.map((pdf, key) => (
          <>
             <Avatar
                key={key}
                style={{ width: "150px", height: "150px" }}
                height="150px"
                width="150px"
                variant="square"
                src="/images/pdfIcon.png"
              >
                N
              </Avatar> 
              <Link href={pdf} download={`Pdf${key + 1}.pdf`}>  {`PDF ${key + 1}`}</Link>

          </>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default  withStyles(styles)(ShowDocumentsDialog)