import {Layout} from '../Layout/Layout';
import React from 'react';
import {AdminPanelLayout} from '../../components/AdminPanelLayout/AdminPanelLayout';
import {connect} from 'react-redux';
import {WebState} from '../../redux/types/WebState';
import {getCurrentUser} from '../../redux/selectors/entities';
import {User} from '../../types/User';

interface Props {
  currentUser: User;
}

const AdminPage = (props: Props) => (
  <Layout>
    <div>
      {props.currentUser.role === 'Admin' ? <AdminPanelLayout/> : null}
    </div>
  </Layout>
);

export default connect((state: WebState) => ({currentUser: getCurrentUser(state)})) (AdminPage);
