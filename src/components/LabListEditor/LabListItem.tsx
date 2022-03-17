import {Col} from 'react-bootstrap';
import {Lab} from '../../types/Lab';
import {Link} from 'react-router-dom';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {IconButton} from '../util/IconButton/IconButton';
import {RoutePaths} from '../../router/RoutePaths';
import {ListRow} from '../util/ListRow/ListRow';
import {LabItem} from '../../types/editorTypes';

interface Props {
  lab: LabItem;
  prefix: string;
  onDelete: () => Promise<any>;
}

function getLabEditorLink(lab: Lab) {
  return RoutePaths.EditLab.replace(':moduleId', String(lab.moduleId)).replace(':labId', String(lab.id));
}

export function LabListItem({prefix, lab, onDelete}: Props){
    return (
      <ListRow>
        <Col style={{marginTop: 8}}>
          {lab.name} - <Link to={getLabEditorLink(lab)}>Edit</Link></Col>
        <Col className='d-flex justify-content-end' style={{marginTop: 8}}>
          <IconButton
            icon={faTrashAlt}
            size='1x'
            onClick={lab.hasUserLabs ? undefined : onDelete}
            color={lab.hasUserLabs ? 'black' : 'red'}
          />
        </Col>
      </ListRow>
    );
}
