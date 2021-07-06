export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_INTERESTS = 'FETCH_INTERESTS';
export const DELETEUSER = 'DELETEUSER';
export const DELETEINTERST = 'DELETEINTERST';

export interface UserInterface {
    name: string;
    following: number[];
    id: string;
    interests: number[];
    followers: number;
}

export interface UsersInterface {
    users: UserInterface[];
    fetchUsers: Function;
}

export interface InterestInterface {
    id: string;
    name: string;
}