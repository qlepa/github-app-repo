import React, { FunctionComponent, useState, useCallback } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Input, makeStyles, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IStoreState } from '../reducers';
import { IRepos } from '../actions';
import { headers } from '../constans'

const selectRepos = (state: IStoreState) => state.reposReducer.repos;
const selectSelectedRepo = (state: IStoreState) => state.reposReducer.selectedRepo;

type IProps = Readonly<{
  goBack: (view: string) => void;
}>

const useStyles = makeStyles(() => ({
  btnNewGoBack: {
    marginTop: '10px',
    fontSize: '1.5rem',
    backgroundColor: '#add2ff',
  },
  
}))

function NewIssue(props: IProps) {
  const [issueTitle, setInputValues] = useState('');
  const repos = useSelector(selectRepos);
  const selectedRepo = useSelector(selectSelectedRepo);

  const handleOnChange = useCallback(event => {
    const { value } = event.target;

    setInputValues(value);
  }, []);

  const handleGoBack = useCallback(
    () => {
      props.goBack?.('default')
    }, [props.goBack]
  )

  const {
    btnNewGoBack: btnNewGoBackClass,
    
  } = useStyles(props)

  const createIssue = function(): void {
    if (repos.length !== 0) {
      const userRepo = repos.find((repo: IRepos) => {
            return repo.id === selectedRepo
          })
      if (userRepo) {
        const url = `https://api.github.com/repos/qlepaplayground/${userRepo.name}/issues`
        axios({
          method: 'POST',
          url: url,
          headers: headers,
          data: {
            title: issueTitle,
          } 
        })
      }
    }

  }
  return(
    <Box>
      <Grid container direction='column' alignItems='center'>
        <Grid item>
          <Typography>Add new issue</Typography>
          <Input onChange={handleOnChange} />
          <Button onClick={createIssue}>SEND</Button>
        </Grid>
        <Grid item>
          <Button className={btnNewGoBackClass} onClick={handleGoBack}>Go back</Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default NewIssue as FunctionComponent;