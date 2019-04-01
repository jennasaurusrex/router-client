import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { MyContext } from "./../../App";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

const TripForm = ({ user, handleSubmit, name, origin, destination, classes }) => (
  <MyContext.Consumer>
    {context => (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar} />
          <Typography component="h1" variant="h5">
            Trip Details
          </Typography>
          <form className={classes.form} onSubmit={context.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="Trip Name">Trip Name</InputLabel>
              <Input
                id="name"
                name="name"
                value={context.name}
                onChange={context.handleChange}
                autoComplete="name"
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="origin">Origin Point</InputLabel>
              <Input
                name="origin"
                value={context.origin}
                type="text"
                id="origin"
                autoComplete="origin"
                onChange={context.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="origin">Destination</InputLabel>
              <Input
                name="destination"
                value={context.destination}
                type="text"
                id="destination"
                autoComplete="destination"
                onChange={context.handleChange}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </main>
    )}
  </MyContext.Consumer>
);

TripForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TripForm);
