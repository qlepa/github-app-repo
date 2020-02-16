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
}

interface IState {
  choosedRepo: number;
  loading: boolean;
}


class _App extends React.Component<IProps, IState> {
  state = {
    choosedRepo: 0,
    loading: true,
  }
  componentDidMount() {
    this.props.fetchRepos()
  };

  chooseRepo = (choosedRepo: number ): void => {
    this.props.setRepo(choosedRepo);
  }

  renderReposList(): JSX.Element[] {
    const {
      repos
    } = this.props

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
  }
  render() {
    // const choosedRepoProps = {
    //   repoId: this.state.choosedRepo,
    // }
    console.log(this.props)
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
              {this.renderReposList()}
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

const mapStateToProps = ({ repos }: IStoreState): { repos: IRepos[] } => {
  return { repos };
};

export const App = connect(
  mapStateToProps,
  { fetchRepos, setRepo }
)(_App)