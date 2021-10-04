import {Button, Form, InputGroup, Modal, ModalBody, ModalFooter, Table} from 'react-bootstrap';
import React, {useState} from 'react';
import {Role, User} from '../../types/User';
import {changeUserRole, getCurrentUserFromServer, getUserList} from '../../api';
import {useMount} from '../../hooks/useMount';
import {HorizontallyCenteredSpinner} from '../util/HorizonallyCenteredSpinner';
import {Layout} from '../../pages/Layout/Layout';
import UserListItem from './UserListItem';
import {ChangeUserRoleRequest} from '../../api';
import {AxiosResponse} from 'axios';
import ModalHeader from 'react-bootstrap/ModalHeader';
import {connect, useDispatch} from 'react-redux';
import {WebState} from '../../redux/types/WebState';
import {getCurrentUser} from '../../redux/selectors/entities';
import {setCurrentUser} from '../../redux/actions/entities/currentUser';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

interface Props {
  currentUser: User;
}

const UsersPane = (props: Props) => {
  const [users, setUsers] = useState();
  const [usersToDisplay, setUsersToDisplay] = useState();
  const [loading, setLoading] = useState(true);
  const [updateRequests, setUpdateRequests] = useState<ChangeUserRoleRequest[]>([]);
  const [commitResponseCode, setCommitResponseCode] = useState();
  const [showWarning, setShowWarning] = useState(false);
  const [warningShown, setWarningShown] = useState(false);
  const [userToUpdateOnConfirm, setUserToUpdate] = useState<[Role, User]>();

  const dispatch = useDispatch();

  useMount(async () => {
    const userList = await getUserList();
    setUsers(userList);
    setUsersToDisplay(userList);
    setLoading(false);
  });

  const handleRoleChange = (role: Role, user: User) => {
    if (user.id === props.currentUser.id && !warningShown) {
      setShowWarning(true);
      setUserToUpdate([role, user]);
    }
    else {
      updateUser(role, user);
    }
  };

  const updateUser = (role: Role, user: User) => {
    user.role = role;
    addUserToUpdate({
      userId: user.id,
      newRole: role
    });
  };

  const addUserToUpdate = (request: ChangeUserRoleRequest) => {
    const requestIndex = updateRequests.findIndex((req) => req.userId === request.userId);
    if (requestIndex < 0) {
      setUpdateRequests([...updateRequests, request]);
    }
    else {
      const newRequests = [...updateRequests];
      newRequests[requestIndex] = request;
      setUpdateRequests(newRequests);
    }
  };

  const updateCurrentUserInWebstate = (user: User) => {
    dispatch(setCurrentUser(user));
  };

  const commitUsers = async () => {
    try {
      const response = await (changeUserRole(updateRequests));
      setCommitResponseCode(response.status);
      setUpdateRequests([]);
      if (warningShown) {
        updateCurrentUserInWebstate(await getCurrentUserFromServer());
      }
    } catch (e) {
      setCommitResponseCode((e as AxiosResponse).status);
    }
    window.setTimeout(() => setCommitResponseCode(undefined), 2000);
  };

  const ConfirmRoleChange = () => {

    const closeModal = () => {
      setShowWarning(false);
    };

    const handleCancel = () => {
      closeModal();
      setUserToUpdate(undefined);
    };

    const handleConfirm = () => {
      closeModal();
      setWarningShown(true);
      if (userToUpdateOnConfirm) {
        updateUser(userToUpdateOnConfirm[0], userToUpdateOnConfirm[1]);
      }
    };

    return (
      <Layout>
        <Modal
          show={showWarning}
          backdrop={'static'}
          keyboard={false}
        >
          <ModalHeader style={{color: '#fff', backgroundColor: '#d9534f'}}>
            CAUTION
          </ModalHeader>
          <ModalBody>
            You are editing your own role. Doing so could lead to unexpected behavior, and you may be denied access to the
            admin panel. Are you certain you wish to proceed?
          </ModalBody>
          <ModalFooter>
            <Button variant={'primary'} onClick={handleCancel}>Cancel</Button>
            <Button variant={'secondary'} onClick={handleConfirm}>Confirm</Button>
          </ModalFooter>
        </Modal>
      </Layout>
    );
  };

  const CommitStatus = () => {
    if (commitResponseCode) {
      if (commitResponseCode > 199 && commitResponseCode < 300) {
        return <p style={{position: 'absolute', top: '0', right: '0', color: '#02b875'}}>Save successful!</p>;
      }
      else if (commitResponseCode === 401) {
        return <p style={{position: 'absolute', top: '0', right: '0', color: '#d9534f'}}>You are not authorized to change
          user roles, or you are no longer signed in. If you are signed in, and you believe
          this to be in error, please see a CSLabs admin</p>;
      }
      else {
        return <p style={{position: 'absolute', top: '0', right: '0', color: '#d9534f'}}>Error saving changes, please try again</p>;
      }
    }
    else {
      return null;
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value) {
      const foundUsers: User[] = [];
      users.map((u: User) => {
        const regex = new RegExp(`${u.firstName}|${u.lastName}|${u.email}|${u.role}`, 'ig');
        if (event.currentTarget.value.search(regex) >= 0) {
          foundUsers.push(u);
        }
      });
      setUsersToDisplay(foundUsers);
    }
    else {
      setUsersToDisplay(users);
    }
  };

  return <Layout>{loading ? <HorizontallyCenteredSpinner/> : (
    <div>
      <ConfirmRoleChange/>
      <div style={{textAlign: 'right', padding: '10px 20px'}}>
        <CommitStatus/>
      <InputGroup>
        <Form.Control
          onChange={handleSearch}
          placeholder={'Search'}
          aria-label={'Search Users'}
          aria-describedby={'search-users'}
        />
        <InputGroup.Text id={'search-users'}><FontAwesomeIcon icon={faSearch}/></InputGroup.Text>
        <Button style={{marginLeft: '10px'}} variant={'outline-primary'} onClick={commitUsers}>Save</Button>
      </InputGroup>
      </div>
      <Table striped={true} bordered={true} hover={true}>
        <thead style={{backgroundColor: '#adb5bd'}}>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
        </thead>
        <tbody>
        {usersToDisplay.map((u: User) => (
          <UserListItem key={u.id} user={u} onRoleChange={handleRoleChange}/>
        ))}
        </tbody>
      </Table>
    </div>
  )}
  </Layout>;

};

export default connect((state: WebState) => ({currentUser: getCurrentUser(state)})) (UsersPane);
