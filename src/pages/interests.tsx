import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { List, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { fetchInterests, deleteUserInterest } from "../redux/actions/users";
import { InterestInterface } from "../redux/constants";

const Interests = ({
  interesets,
  fetchInterests,
  onDeleteUserInterest,
  users,
}: any) => {
  const [currentUser, setCurrentUser] = useState<any>({
    name: "",
    id: "",
    interests: [],
  });
  const { id }: any = useParams();

  useEffect(() => {
    fetchInterests();
  }, [fetchInterests]);

  useEffect(() => {
    const selectedUser = _.find(users, (o) => {
      return o.id === Number(id);
    });
    setCurrentUser(selectedUser);
  }, [users, id]);

  return (
    <div>
      {currentUser && (
        <div>
          <UserOutlined style={{ fontSize: 24, paddingRight: 10 }} />
          {currentUser.name}
        </div>
      )}
      {interesets.map((intereset: InterestInterface) => {
        const isExist = currentUser.interests
          ? currentUser.interests.indexOf(Number(intereset.id)) > -1
          : false;
        return (
          <div key={intereset.id}>
            {isExist && (
              <List.Item
                actions={[
                  <Button
                    type="text"
                    onClick={() =>
                      onDeleteUserInterest(currentUser.id, intereset.id)
                    }
                  >
                    Delete
                  </Button>,
                ]}
              >
                <List.Item.Meta key={intereset.id} title={intereset.name} />
              </List.Item>
            )}
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = ({ users }: any) => ({
  interesets: users.interests,
  users: users.users,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchInterests: () => dispatch(fetchInterests()),
  onDeleteUserInterest: (userId: string, intId: string) =>
    dispatch(deleteUserInterest(userId, intId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Interests);
