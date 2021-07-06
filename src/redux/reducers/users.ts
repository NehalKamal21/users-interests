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

const calCulateFollowers = (usersList: UserInterface[]) => {
  return usersList.map((user: UserInterface) => {
    let followers = 0;
    followers = _.filter(usersList, (Filtereduser) => Filtereduser.following.indexOf(parseInt(user.id)) > -1).length;
    return {
      ...user,
      followers
    }
  });
}

const usersReducer = (state: UsersInterface = initialState, action: ActionInterface) => {

  switch (action.type) {
    case CONST.FETCH_USERS: {
      const { users } = action.payload;
      const updatedUser = calCulateFollowers(users)

      return {
        ...state,
        users: _.orderBy(updatedUser, ['user', function (o) {
          return o.followers;
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
      const removedUser = _.remove(users, function (n) {
        return (n.id.toString() !== userId);
      })
      const updatedUsers = calCulateFollowers(removedUser);

      return {
        ...state,
        users: updatedUsers,
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