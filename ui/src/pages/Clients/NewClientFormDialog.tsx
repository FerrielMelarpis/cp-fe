import { Close } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Step, StepLabel, Stepper, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

type NewClientFormDialogProps = {
  open: boolean;
  onSubmit: (client: NewClient) => void;
  onClose?: () => void;
};
const initialFormState: NewClient = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};
// TODO: possible a11y issue with the form, need to search a bit more.
// The separation of the form controls and submit button due to separate `DialogContent` and `DialogActions` makes it a bit difficult
// to make the form work normally i.e. Enter key should submit on last step
// This would require a bit more complex handling.
export function NewClientFormDialog({ open, onSubmit, onClose }: NewClientFormDialogProps) {
  const [activeStep, setActiveStep] = useState(0);
  const stepForward = () => setActiveStep(s => s + 1);
  const stepBackward = () => setActiveStep(s => s - 1);
  // TODO: use a form library or create a form hook
  const [formState, setFormState] = useState(initialFormState);
  const resetForm = () => setFormState(initialFormState);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(state => ({ ...state, [name]: value }));
  }, []);
  const handleSubmit = () => {
    onSubmit(formState);
    resetForm();
    onClose?.();
  };
  const steps = ["Personal details", "Contact details"];
  const formSteps = [
    (
      <>
        <TextField
          required
          fullWidth
          key="firstName"
          type="text"
          name="firstName"
          label="First name"
          variant="outlined"
          margin="dense"
          value={formState.firstName}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          key="lastName"
          type="text"
          name="lastName"
          label="Last name"
          variant="outlined"
          margin="dense"
          value={formState.lastName}
          onChange={handleChange}
        />
      </>
    ),
    (
      <>
        <TextField
          required
          fullWidth
          key="email"
          type="text"
          name="email"
          label="Email"
          variant="outlined"
          margin="dense"
          value={formState.email}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          key="phoneNumber"
          type="text"
          name="phoneNumber"
          label="Phone number"
          variant="outlined"
          margin="dense"
          value={formState.phoneNumber}
          onChange={handleChange}
        />
      </>
    )
  ];
  const formActions = [
    (<Button
    variant="contained"
    disabled={formState.firstName.length === 0 || formState.lastName.length === 0}
    onClick={stepForward}>Continue</Button>),
    (
      <>
        <Button variant="contained" onClick={stepBackward}>Back</Button>
        <Button
          disabled={formState.email.length === 0 || formState.phoneNumber.length === 0}
          variant="contained"
          onClick={handleSubmit}>
          Create client
        </Button>
      </>
    ),
  ];

  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>
        Create new client
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: theme => theme.palette.grey[500],
          }}>
          <Close />
        </IconButton>
        <Stepper activeStep={activeStep} sx={{ marginTop: 3, marginBottom: 2 }}>
          {steps.map(step => (<Step key={step}><StepLabel>{step}</StepLabel></Step>))}
        </Stepper>
      </DialogTitle>
      <DialogContent>
        {formSteps[activeStep]}
      </DialogContent>
      <DialogActions>
        {formActions[activeStep]}
      </DialogActions>
    </Dialog>
  );
}
