import React, { FunctionComponent } from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@material-ui/core';

interface IProps {
  
}

function NewIssue(props: IProps) {
  const createIssue = function(): void {
    // if (props.repos.length !== 0) {
    //   const selectedRepo = props.repos.find((repo: IRepos) => {
    //     return repo.id === props.choosedRepo
    //   })
    //   if (selectedRepo) {
        // const issueNumber = Math.round(Math.random()*selectedRepo.open_issues)
      const url = `https://api.github.com/repos/qlepaplayground/repo-1/issues`
      // const headers = {
      //   "Authorization" : `Token 673c0b9c7118c2be340781d8b719c50a2c6cc48b`
      // }
      // const payload = {
      //   title: 'New one issue from my app!'
      // }
      console.log('pierwszy')
      axios({
        method: 'POST',
        url: url,
        headers: {
          "Authorization" : `Token 43a52db76bc30c22fbfe93c96bb15c1e161cc678`,
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Origin': 'http://localhost:3000/', 
        },
        data: {
          title: 'New issue from my beauty app!'
        } 
      })
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
      console.log('DONE')
        // .then(res => {
        //   console.log(res.data)
        //   setData(res.data)
        // })
        // .catch(err => {
        //   console.log(err)
        // })
      // }
    // }
  }

  return(
    <Box>
      <Typography>Add new issue</Typography>
      <Typography>Title: </Typography>
      <Typography>Description: </Typography>
      <Button onClick={createIssue}>NEW</Button>
    </Box>
  )
}

export default NewIssue as FunctionComponent;