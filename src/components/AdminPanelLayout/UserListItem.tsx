import React, {FormEvent, useState} from 'react';
import {Role, User} from '../../types/User';

export interface ChangeUserRoleRequestSchema {
  newRole: string;
  userId: number;
}

interface Props {
  user: User;
  updateRolesFunction: (u: User) => void;
}

const roleOptions = [
  {value: 'Guest' as Role, label: 'Guest'},
  {value: 'Creator' as Role, label: 'Creator'},
  {value: 'Admin' as Role, label: 'Admin'}
];

const UserListItem = (props: Props) => {

  const [currentRole, setCurrentRole] = useState<Role>(props.user.role);

  const handleRoleChange = (event: FormEvent<HTMLSelectElement>, user: User) => {
    if (event.currentTarget.value !== currentRole) {
      setCurrentRole(event.currentTarget.value as Role);
      user.role = currentRole;
      props.updateRolesFunction(user);
    }
  };

  return <tr style={{cursor: 'pointer'}}>
    <td>{props.user.firstName} {props.user.lastName}</td>
    <td>{props.user.email}</td>
    <td>
      <select value={currentRole} onChange={event => handleRoleChange(event, props.user)}>
        {roleOptions.map((role => (
          <option key={role.value} value={role.value}>{role.label}</option>
        )))}
      </select>
    </td>
  </tr>;

};

export default UserListItem;
