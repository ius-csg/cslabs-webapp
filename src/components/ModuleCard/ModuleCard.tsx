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
import {TagEditor} from '../TagEditor/TagEditor';
import {faEllipsisH, faWindowClose} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface ModuleCardProps extends ReturnType<typeof mapStateToProps> {
  module: Module|UserModule;
  buttonLink?: string;
  buttonAction?: () => void;
}
interface ModuleCardState {
  viewTagsExpanded: boolean;
}

function doNothing() {
  // do nothing
}

class ModuleCardComponent extends Component<ModuleCardProps, ModuleCardState> {

  constructor(props: ModuleCardProps) {
    super(props);
    this.state = {viewTagsExpanded: false};
  }

  render() {
    let module: Module = this.props.module as Module;
    if (this.props.module['module'] !== undefined) {
      module = (this.props.module as UserModule).module;
    }
    return (
        <Card className={Styles.card}>
          {/*<Card.Img variant='top' src={TestImage}/>*/}
          <Card.Body style={{height: 270}}>
            <Card.Title>{module.name}</Card.Title>
            {!this.state.viewTagsExpanded ?
              <Card.Text style={{textAlign: 'left', fontSize: '1rem', fontWeight: 400, color: '#343a40'}}>
              {module.description.substring(0, 150)}
            </Card.Text> : null}
            {module.moduleTags.length !== 0 ?
              <TagEditor
                onAdd={doNothing}
                editing={false}
                tagSuggestions={[]}
                onInput={doNothing}
                onDelete={doNothing}
                tags={
                  module.moduleTags.length > 4 && !this.state.viewTagsExpanded
                    ? module.moduleTags.slice(0,4).map(mt => mt.tag)
                    : module.moduleTags.map(mt => mt.tag)
                }
                mes={this.state.viewTagsExpanded ? 'display-only expanded' : 'display-only'}
              />
             : null
            }
            <FontAwesomeIcon
              icon={this.state.viewTagsExpanded ? faWindowClose : faEllipsisH}
              style={{display: 'inline', cursor: 'pointer', position: 'relative', top: 4, color: '#868e96'}}
              onClick={() => {this.setState({viewTagsExpanded: !this.state.viewTagsExpanded});}}
            />
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
