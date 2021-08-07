import React, {useState} from 'react';
import {ERole, Role, User} from '../../types/User';
import {ChangeUserRoleRequest} from '../../api';

interface Props {
  user: User;
  onRoleChange: (r: ChangeUserRoleRequest) => void;
  isCurrentUser?: boolean;
}

const roleOptions = Object.values(ERole).map(r => ({value: r, label: r}));

const UserListItem = (props: Props) => {

  const [currentRole, setCurrentRole] = useState<Role>(props.user.role);

  const handleRoleChange = (role: Role, user: User) => {
    if (props.isCurrentUser && role !== 'Admin') {
      alert('CAUTION: You are editing your own role. Doing so could lead to unexpected behavior, and you may be denied' +
        ' access to the admin panel. Proceed with caution.');
    }
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
