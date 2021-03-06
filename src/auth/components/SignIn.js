import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { signIn } from '../api';
import messages from '../messages';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = event =>
    this.setState({
      [event.target.name]: event.target.value,
    });

  onSignIn = event => {
    event.preventDefault();

    const { alert, history, setUser } = this.props;

    signIn(this.state)
      .then(res => {this.props.saveUser(res.data.user); setUser(res.data.user)})
      .then(() => alert(messages.signInSuccess, 'success'))
      .then(() => history.push('/home'))
      .catch(error => {
        console.error(error);
        this.setState({ email: '', password: '' });
        alert(messages.signInFailure, 'danger');
      });
  };

  render() {
    const { email, password } = this.state;

    return (
      <main className={this.props.classes.main}>
        <CssBaseline />
        <Paper className={this.props.classes.paper}>
          <Avatar className={this.props.classes.avatar} />
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={this.props.classes.form} onSubmit={this.onSignIn}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="Email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={this.handleChange}
                autoComplete="email"
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="description">Password</InputLabel>
              <Input
                name="password"
                value={password}
                type="password"
                id="password"
                autoComplete="password"
                onChange={this.handleChange}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes.submit}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SignIn));
