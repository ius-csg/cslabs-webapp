import React from 'react';
import {ERole, Role, User} from '../../types/User';

interface Props {
  user: User;
  onRoleChange: (r: Role, u: User) => void;
}

const roleOptions = Object.values(ERole).map(r => ({value: r, label: r}));

const UserListItem = (props: Props) => {

  const handleRoleChange = (role: Role, user: User) => {
    props.onRoleChange(role, user);
  };

  return (
      <tr style={{cursor: 'pointer'}}>
        <td>{props.user.firstName} {props.user.lastName}</td>
        <td>{props.user.email}</td>
        <td>
          <select
            value={props.user.role}
            onChange={event => handleRoleChange(event.currentTarget.value as Role, props.user)}
          >
            {roleOptions.map((role => (
              <option key={role.value} value={role.value}>{role.label}</option>
            )))}
          </select>
        </td>
      </tr>
  );

};

export default UserListItem;
