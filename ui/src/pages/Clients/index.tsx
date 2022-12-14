import { ChangeEvent, memo, useCallback, useContext, useEffect, useState } from "react";
import { Alert, Button, Grid, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { ACTIONS, StateContext } from "../../store/DataProvider";
import Page from "../../components/Page";
import ClientTable from "./ClientTable";
import { createClient, getClients } from "../../services/api";
import { NewClientFormDialog } from "./NewClientFormDialog";

function Clients() {
  const { state, dispatch } = useContext(StateContext);
  const { clients, notif } = state;
  const [search, setSearch] = useState('');
  const onSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value), []);
  const filteredClients = clients.filter(client => {
    const fullname = `${client.firstName} ${client.lastName}`;
    return fullname.toLowerCase().includes(search.toLowerCase());
  });
  const [showFormDialog, setShowFormDialog] = useState(false);
  const openFormDialog = () => setShowFormDialog(true);
  const closeFormDialog = () => setShowFormDialog(false);
  const clearNotif = () => dispatch({ type: ACTIONS.SET_NOTIF, data: null });
  const addClient = (client: NewClient) => {
    createClient(client)
      .then(data => {
        dispatch({ type: ACTIONS.ADD_CLIENT, data });
        dispatch({ type: ACTIONS.SET_NOTIF, data: { type: "success", message: "Successfully added a new client" } });
      })
      .catch(error => {
        dispatch({ type: ACTIONS.SET_NOTIF, data: { type: "error", message: error.data } });
      });
  };

  useEffect(() => {
    getClients().then((clients) =>
      dispatch({ type: ACTIONS.FETCH_ALL_CLIENTS, data: clients })
    );
  }, [dispatch]);

  return (
    <Page>
      <Typography variant="h4" sx={{ textAlign: "start" }}>
        Clients
      </Typography>
      <Grid container sx={{ justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>
        <TextField name="search" type="text" label="Search clients" placeholder="Search clients..." margin="dense" value={search} onChange={onSearchChange} />
        <Button variant="contained" onClick={openFormDialog}>Create new client</Button>
      </Grid>
      <Paper sx={{ margin: "auto", marginTop: 3 }}>
        <ClientTable clients={filteredClients} />
      </Paper>
      <NewClientFormDialog open={showFormDialog} onSubmit={addClient} onClose={closeFormDialog} />
      <Snackbar open={notif != null} autoHideDuration={6000} onClose={clearNotif}>
        <Alert onClose={clearNotif} severity={notif?.type}>
          {notif?.message}
        </Alert>
      </Snackbar>
    </Page>
  );
}

export default memo(Clients);
