import * as React from 'react';
import {AccountManagementLayout} from '../../components/AccountManagementLayout/AccountManagementLayout';
import {Link} from 'react-router-dom';
import {RoutePaths} from '../../router/RoutePaths';
import {connect} from 'react-redux';
import {WebState} from '../../redux/types/WebState';
import {getCurrentUser} from '../../redux/selectors/entities';
import {User} from '../../types/User';
import {Col, ListGroup, Row} from 'react-bootstrap';
import {getLocalDateTimeString} from '../../util';
import {ButtonLink} from 'components/util/ButtonLink';

interface ProfileProps extends ReturnType<typeof mapStateToProps> {
  user: User;
}

const Profile = (props: ProfileProps) => {

  return (
    <AccountManagementLayout>
      <h2>Profile</h2>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <Row>
            <Col sm={4}>Name</Col><Col>{props.user.firstName} {props.user.lastName}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col sm={4}>Email</Col><Col>{props.user.email}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col sm={4}>Last updated</Col><Col>{getLocalDateTimeString(props.user.updatedAt)}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col sm={4}>Account active until</Col><Col>{getLocalDateTimeString(props.user?.terminationDate)}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <ButtonLink to={RoutePaths.logout} className='btn-danger'>Log Out</ButtonLink>
          </Row>
        </ListGroup.Item>
        <Link to={RoutePaths.sitePolicy} className='text-muted'><small>Site Terms and Policy</small></Link>
      </ListGroup>
    </AccountManagementLayout>
  );
};

const mapStateToProps = (state: WebState) => ({ user: getCurrentUser(state) });
export default connect(mapStateToProps)(Profile);
