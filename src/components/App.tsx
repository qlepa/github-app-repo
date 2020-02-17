import React from 'react';
import { connect } from 'react-redux';
import { IRepos, fetchRepos, setRepo } from '../actions';
import { IStoreState } from '../reducers';
import { Box, Grid, Typography, Badge, Paper, CircularProgress, withStyles, WithStyles, createStyles } from '@material-ui/core';
import SelectedRepo from './SelectedRepo'
import Issues from './Issues'
import { compose } from 'redux';

interface IProps {
  repos: IRepos[];
  fetchRepos: Function;
  setRepo: Function;
  loadingRepos: string;
  classes?: any;
}

interface IState {
  selectedRepo: number;
}

class _App extends React.Component<IProps, IState, WithStyles> {
  state = {
    selectedRepo: 0,
  }
  componentDidMount() {
    this.props.fetchRepos()
  };

  chooseRepo = (selectedRepo: number ): void => {
    this.props.setRepo(selectedRepo);
  }

  renderReposList(): JSX.Element[] | JSX.Element {
    const {
      repos,
      loadingRepos,
      classes,
    } = this.props
    switch (loadingRepos) {
      case 'succes':
        return repos.map((repo: IRepos) => {
          const { classes } = this.props;

          return (
            <Grid item key={repo.id}>
              <Badge 
                badgeContent={`Issues ${repo.open_issues}`}
                color='primary'
                onClick={() => this.chooseRepo(repo.id)}
              >
                <Paper elevation={3} className={classes.repoWrapper}>
                  <Typography variant="h6">{repo.name}</Typography>
                  <Typography noWrap>{repo.description}</Typography>
                </Paper>
            </Badge>
          </Grid>
          )
        })
      case 'fail':
        return <Box><Typography className={classes.error} variant='h5'>FAIL :( Unable to fetch repos. Try again</Typography></Box>
      case 'loading':
      default:
        return <CircularProgress disableShrink />
    }
  }
  render() {
    const { classes } = this.props;

    return (
      <Box className={classes.wrapper}>
        <Grid container direction='column'>
          <Grid container justify='space-around'>
            <Grid item md={6}>
              <Typography variant='h1'>Welcome to Friday Issue Randomizer</Typography>
            </Grid>
            <Grid item md={6}>
              <Typography variant='h3' className={classes.detailsTitle}>How it works?</Typography>
              <Typography className={classes.detailsContent}>
                There is always a lot small tasks TODO in our repos. Let's make friday a "Random Issue Day". 
                Everyone can random a issue to do depends of selected repo.
              </Typography>
              <Typography className={classes.detailsContent}>1. Select repo</Typography>
              <Typography className={classes.detailsContent}>2. Random issue or add new one</Typography>
            </Grid>
          </Grid>
          <Grid container direction='column' alignItems='center' spacing={4}>
            <Grid item>
              <Typography variant='h3'>qlepaPlaygrounds repos</Typography>
            </Grid>
            <Grid item>
              <Grid container>
                {this.renderReposList()}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems='center' justify='space-around'>
              <Grid item md={6}>
                <SelectedRepo />
              </Grid>
              <Grid item>
                <Issues />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    )
  }
}

const styles = () => createStyles({
  wrapper: {
    maxWidth: '1400px',
  },
  detailsTitle: {
    marginTop: '20px',
  },
  detailsContent: {
    fontSize: '1.5rem',
    color: '#7e859b',
  },
  repoWrapper: {
    cursor: 'pointer', 
    margin: "10px", 
    padding: "5px", 
    overflow: "hidden", 
    textOverflow: "ellipsis", 
    width: '200px', 
    height: '100px'
  },
  error: {
    color: 'red',
  },
})

const mapStateToProps = (state: IStoreState): { repos: IRepos[], loadingRepos: string } => {
  return { repos: state.reposReducer.repos, loadingRepos: state.reposReducer.loadingRepos }
};

export const App = compose(
    withStyles(styles),
    connect(
      mapStateToProps, 
      { fetchRepos, setRepo }),
  )(_App) as any;