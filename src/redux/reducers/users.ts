import * as CONST from '../constants';
import _ from 'lodash';
import { UserInterface } from '../constants';

const initialState = {
  users: [],
  interests: []
}

interface ActionInterface {
  type: string;
  payload: any;
}

interface UsersInterface {
  users: UserInterface[];
  interests: any[];
}

const usersReducer = (state: UsersInterface = initialState, action: ActionInterface) => {

  switch (action.type) {
    case CONST.FETCH_USERS: {
      const { users } = action.payload;
      return {
        ...state,
        users: _.orderBy(users, ['user', function (o) {
          return o.following.length;
        }], ["asc", "asc"])
      }
    }

    case CONST.FETCH_INTERESTS: {
      const { interests } = action.payload;
      return {
        ...state,
        interests
      }
    }
    case CONST.DELETEUSER: {
      const { userId } = action.payload;
      const { users } = state;
      const updatedUser = _.remove(users, function (n) {
        return (n.id.toString() !== userId);
      })

      return {
        ...state,
        users: updatedUser,
      }
    }

    case CONST.DELETEINTERST: {
      const { userId, interestId } = action.payload;
      const { users } = state;
      const updatedUser = users.map(user => {
        const ind = userId === user.id ? user.interests?.indexOf(interestId) : -1;
        const newint = ind > -1 ? _.remove(user.interests, function (n) {
          return (n.toString() !== interestId.toString());
        }) : user.interests;

        return {
          ...user,
          interests: newint,
        }
      });

      return {
        ...state,
        users: updatedUser,
      }
    }
    default:
      return state;

  }
}

export default usersReducer;