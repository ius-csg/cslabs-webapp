import React, {FormEvent, useState} from 'react';
import {Role, User} from '../../types/User';
import {LoginFormValues} from '../../pages/LoginRegisterPage/LoginFormSchema';

export interface ChangeUserRoleRequestSchema extends LoginFormValues {
  newRole: string;
  userId: number;
}

interface Props {
  user: User;
}

const roleOptions = [
  {value: 'Guest' as Role, label: 'Guest'},
  {value: 'Creator' as Role, label: 'Creator'},
  {value: 'Admin' as Role, label: 'Admin'}
];

const UserListItem = (props: Props) => {

  const [hasChanged, setHasChanged] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role>(props.user.role);

  const handleRoleChange = (event: FormEvent<HTMLSelectElement>) => {
    if (event.currentTarget.value !== currentRole) {
      setCurrentRole(event.currentTarget.value as Role);
      if (!hasChanged) {
        setHasChanged(true);
      }
    }
  };

  return <tr style={{cursor: 'pointer'}}>
    <td>{props.user.firstName} {props.user.lastName}</td>
    <td>{props.user.email}</td>
    <td>
      <select value={currentRole} onChange={event => handleRoleChange(event)}>
        {roleOptions.map((role => (
          <option value={role.value}>{role.label}</option>
        )))}
      </select>
    </td>
  </tr>;

};

export default UserListItem;
