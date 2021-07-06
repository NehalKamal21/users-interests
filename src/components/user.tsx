import React from "react";
import { Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const User = (props: any) => {
  const { name, following, id, onDeleteUser, interests, followers } = props;
  const { Meta } = Card;

  return (
    <Card
      className="user"
      actions={[
        <DeleteOutlined key="delete" onClick={() => onDeleteUser(id)} />,
        interests ? <NavLink to={`${id}/interests`}>Interests</NavLink> : null,
      ]}
    >
      <Meta title={name} description={<p>Followers: {followers}</p>} />
    </Card>
  );
};

export default User;
