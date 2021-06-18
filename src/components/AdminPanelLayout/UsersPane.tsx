import {TabPane, ListGroup, ListGroupItem} from 'react-bootstrap';
import React from 'react';

// TODO: replace dummy data with actual data from database retrieved with API call(s)
const users = [{'id':1, 'firstname':'John', 'lastname':'User', 'role':'Student'}, {'id':2, 'firstname':'Bill', 'lastname':'Buddy', 'role':'Admin'}];

// TODO: figure out how to get this list to flow horizontally
const userList = users.map((d) =>
  <ListGroup key={d.id}>
    <ListGroupItem key={d.firstname}>
      {d.firstname}
    </ListGroupItem>
    <ListGroupItem key={d.lastname}>
      {d.lastname}
    </ListGroupItem>
    <ListGroupItem key={d.role}>
      {d.role}
    </ListGroupItem>
  </ListGroup>
);

export const UsersPane = () => (
  <TabPane eventKey='#user-management'>
    <ListGroup>
      {userList}
    </ListGroup>
  </TabPane>
);
