import React, { useState, FunctionComponent } from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import RandomIssue from './RandomIssue';
import NewIssue from './NewIssue';
import { IRepos, fetchIssue } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import { IStoreState } from '../reducers';

const selectSelectedRepo = (state: IStoreState) => state.reposReducer.selectedRepo;
const selectRepos = (state: IStoreState) => state.reposReducer.repos;

type IProps = {}

const useStyles = makeStyles(() => ({
  btnRandom: {
    fontSize: '1.5rem',
  },
  btnNewIssue: {
    fontSize: '1.5rem',
  },
}))

function Issues(props: IProps) {
  const [issueView, setView] = useState<string>('default');
  const repos = useSelector(selectRepos)
  const selectedRepo = useSelector(selectSelectedRepo);
  const dispatch = useDispatch()

  
  const randomIssue = (): void => {
    if (repos.length !== 0) {
      const userRepo = repos.find((repo: IRepos) => {
        return repo.id === selectedRepo
      })
      if (userRepo) {
        const issueNumber = Math.floor(Math.random() * userRepo.open_issues + 1)
        dispatch(fetchIssue(userRepo.name, issueNumber))
      }
    }
    setView('random')
  }

  const setIssueView = (view: string): void => {
    setView(view)
  }

  const newIssue = function(): void {
    setView('new')
  }

  const {
    btnRandom: btnRandomClass,
    btnNewIssue: btnNewIssueClass,
  } = useStyles(props)

  const IssueProps: any = {
    goBack: setIssueView
  }

  switch(issueView) {
    case 'random':
      return <RandomIssue {...IssueProps} />
    case 'new':
      return <NewIssue {...IssueProps} />
    case 'default':
    default:
      const disabled = selectedRepo === 0
      
      return(
      <Box>
        <Button className={btnRandomClass} disabled={disabled} onClick={randomIssue}>Random</Button>
        <Button className={btnNewIssueClass} disabled={disabled} onClick={newIssue}>Add new</Button>
      </Box>
      )
  }
}

export default Issues as FunctionComponent;