import {Button, Card} from 'react-bootstrap';
import React, {Component} from 'react';
import Styles from './ModuleCard.module.scss';
import {Module} from '../../types/Module';
import {WebState} from '../../redux/types/WebState';
import {connect} from 'react-redux';
import {isAuthenticated} from '../../redux/selectors/entities';
import {Link} from 'react-router-dom';
import {UserModule} from '../../types/UserModule';
import {getLocalDateTimeString} from '../../util';
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface ModuleCardProps extends ReturnType<typeof mapStateToProps> {
  module: Module|UserModule;
  buttonLink?: string;
  buttonAction?: () => void;
}
interface ModuleCardState {
  viewTags: boolean;
  viewTagsExpanded: boolean;
}

class ModuleCardComponent extends Component<ModuleCardProps, ModuleCardState> {

  constructor(props: ModuleCardProps) {
    super(props);
    this.state = {viewTags: false, viewTagsExpanded: false};
  }

  render() {
    let module: Module = this.props.module as Module;
    if (this.props.module['module'] !== undefined) {
      module = (this.props.module as UserModule).module;
    }
    return (
        <Card className={Styles.card}>
          {/*<Card.Img variant='top' src={TestImage}/>*/}
          <Card.Body style={{height: 300}}>
            <Card.Title>{module.name}</Card.Title>
            <Card.Text style={{height: 105, overflow: 'hidden', marginBottom: 5}}>
              {module.description.substring(0, 150)}
            </Card.Text>
            {module.moduleTags.length !== 0 ?
              <div className={Styles.tag}>
                {module.moduleTags.map(mt =>
                  <Button
                    size={this.state.viewTags ? 'sm' : 'lg'}
                    className='shadow-none mb-1 mr-1 overflow-hidden'
                    style={this.state.viewTags ? {height: '30px'} : {height: '20px'}}
                    onClick={() => this.setState({viewTags: !this.state.viewTags})}
                    key={mt.tag.id}
                  >
                    {(this.state.viewTags) ? mt.tag.name : ''}
                  </Button>)}
                {this.state.viewTags ?
                  <FontAwesomeIcon
                    icon={faEllipsisH}
                    className='mt-3'
                    style={{cursor: 'pointer'}}
                    onClick={() => {this.setState({viewTags: !this.state.viewTags});}}
                  /> : null
                }
              </div> : null
            }

          </Card.Body>
          <Card.Footer style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <small className='text-muted'>{getLocalDateTimeString(module.updatedAt)}</small>
            {this.getStartButton()}
          </Card.Footer>
        </Card>
    );
  }


  getStartButton() {
    if (this.props.buttonLink) {
      return (
        <Link to={this.props.buttonLink}>
          <Button className='btn btn-primary' style={{width: 200}}>View</Button>
        </Link>
      );
    } else if (this.props.buttonAction) {
      return (<Button onClick={this.props.buttonAction} className='btn btn-primary' style={{width: 200}}>View</Button>);
    } else {
      return null;
    }
  }
}
const mapStateToProps = (state: WebState) => ({authenticated: isAuthenticated(state)});
export const ModuleCard = connect(mapStateToProps)(ModuleCardComponent);
