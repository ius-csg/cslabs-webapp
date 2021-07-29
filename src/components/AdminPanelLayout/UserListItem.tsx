import React, {useState} from 'react';
import {ERole, Role, User} from '../../types/User';
import {ChangeUserRoleRequest} from '../../api';

interface Props {
  user: User;
  onRoleChange: (r: ChangeUserRoleRequest) => void;
}

const roleOptions = Object.values(ERole).map(r => ({value: r, label: r}));

const UserListItem = (props: Props) => {

  const [currentRole, setCurrentRole] = useState<Role>(props.user.role);

  const handleRoleChange = (role: Role, user: User) => {
    setCurrentRole(role);
    user.role = role;
    props.onRoleChange({
      userId: user.id,
      newRole: role
    });
  };

  return <tr style={{cursor: 'pointer'}}>
    <td>{props.user.firstName} {props.user.lastName}</td>
    <td>{props.user.email}</td>
    <td>
      <select value={currentRole} onChange={event => handleRoleChange(event.currentTarget.value as Role, props.user)}>
        {roleOptions.map((role => (
          <option key={role.value} value={role.value}>{role.label}</option>
        )))}
      </select>
    </td>
  </tr>;

};

export default UserListItem;
