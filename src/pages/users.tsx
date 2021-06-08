import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers, ondeleteUser } from "../redux/actions/users";
import User from "../components/user";
import { UsersInterface } from "../redux/constants";
import "../index.scss";

const Users = (props: any) => {
  const { users, fetchUsers }: UsersInterface = props;
  const { deleteUser } = props;
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  const handleDeleteUser = (id: string): void => {
    deleteUser(id.toString());
  };
  return (
    <div className="users-container">
      {users.map((user) => (
        <User
          key={user.id}
          name={user.name}
          following={user.following}
          id={user.id}
          interests={user.interests}
          onDeleteUser={handleDeleteUser}
        />
      ))}
    </div>
  );
};

const mapStateToProps = ({ users }: any) => ({
  users: users.users,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  deleteUser: (id: string) => dispatch(ondeleteUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
