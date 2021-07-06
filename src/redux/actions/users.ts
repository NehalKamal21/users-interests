import * as CONST from '../constants';
import axios from 'axios';
import { UsersInterface } from '../constants';

const fetchUsers = () => (dispatch: any): void => {
  axios.get<UsersInterface[]>("/users.json", {
    responseType: 'json',
    headers: {
      "Accept": "application/json; odata=verbose"
    }
  }).then((response) => {
    dispatch({
      type: CONST.FETCH_USERS,
      payload: { users: response.data }
    })
  })
}

const fetchInterests = () => (dispatch: any): void => {
  axios.get("/interests.json", {
    responseType: 'json',
    headers: {
      "Accept": "application/json; odata=verbose"
    }
  }).then((response) => {
    dispatch({
      type: CONST.FETCH_INTERESTS,
      payload: { interests: response.data }
    })
  })
}

const deleteUserInterest = (userId: string, interestId: string) => (dispatch: any): void => {
  dispatch({
    type: CONST.DELETEINTERST,
    payload: {
      userId, interestId
    }
  })
}

const ondeleteUser = (userId: string) => (dispatch: any): void => {
  dispatch({
    type: CONST.DELETEUSER,
    payload: {
      userId
    }
  })
}

export {
  fetchUsers,
  fetchInterests,
  deleteUserInterest,
  ondeleteUser
}