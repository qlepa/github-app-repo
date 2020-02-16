import React from 'react';
import { connect } from 'react-redux';
import { IRepos, fetchRepos, setRepo } from '../actions';
import { IStoreState } from '../reducers';
import { Box, Grid, Typography, Badge, Paper } from '@material-ui/core';
import ChoosedRepo from './ChoosedRepo'
import Issues from './Issues'

interface IProps {
  repos: IRepos[];
  fetchRepos: Function;
  setRepo: Function;
  loadingRepos: string;
}

interface IState {
  choosedRepo: number;
}


class _App extends React.Component<IProps, IState> {
  state = {
    choosedRepo: 0,
  }
  componentDidMount() {
    this.props.fetchRepos()
  };

  chooseRepo = (choosedRepo: number ): void => {
    this.props.setRepo(choosedRepo);
  }

  renderReposList(): JSX.Element[] {
    const {
      repos,
      loadingRepos,
    } = this.props
    // switch (loadingRepos) {
    //   case 'succes':
        return repos.map((repo: IRepos) => {
          return (
            <Badge 
              badgeContent={`Issues ${repo.open_issues}`}
              color='primary'
              onClick={() => this.chooseRepo(repo.id)} key={repo.id}
            >
              <Paper elevation={3}>
                <Typography>{repo.name}</Typography>
                <Typography>{repo.description}</Typography>
              </Paper>
          </Badge>
          )
        })
      // case 'fail':
      //     default:
      //   return (
      //     <Box><Typography>FAIL</Typography></Box>
      //   )
    // }
  }
  render() {
    console.log(this.props)
    // const choosedRepoProps = {
    //   repoId: this.state.choosedRepo,
    // }

    return (
      <Box>
        <Grid container direction='column'>
          <Grid container justify='space-around'>
            <Grid item md={6}>
              <Typography variant='h1'>Welcome to Friday Issue Randomizer</Typography>
            </Grid>
            <Grid item md={6}>
              <Typography variant='h2'>What is this?</Typography>
              <Typography>alksndlkamsdlkamsdlkamsdlkasmdlkamsdlkasmd</Typography>
            </Grid>
          </Grid>
          <Grid container direction='column' alignItems='center' spacing={4}>
            <Grid item>
              <Typography variant='h3'>qlepaPlaygrounds repos</Typography>
            </Grid>
            <Grid item>
              {this.props.loadingRepos === 'loading' ? <Typography>LOADING</Typography> :this.renderReposList()}
            </Grid>
          </Grid>
          <Grid container>
            <Grid container justify='space-around'>
              <Grid item md={4}>
                <ChoosedRepo />
              </Grid>
              <Grid item md={8}>
                <Issues />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    )
  }
}

const mapStateToProps = (state: IStoreState): { repos: IRepos[], loadingRepos: string } => {
  return { repos: state.reposReducer.repos, loadingRepos: state.reposReducer.loadingRepos }
};

export const App = connect(
  mapStateToProps,
  { fetchRepos, setRepo }
)(_App)