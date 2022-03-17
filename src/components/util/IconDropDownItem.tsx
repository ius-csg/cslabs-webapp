import {Dropdown, Spinner} from 'react-bootstrap';
import {CenteredIcon} from '../../util/CenteredIcon';

interface Props {
  icon: any;
  color?: string;
  onClick: () => void;
  label: string;
  loading?: boolean;
  loadingText?: string;
}

export function IconDropDownItem({icon, color, onClick, label, loading, loadingText}: Props) {
  return (
    <Dropdown.Item onClick={onClick}>
      {loading ?
        <>
        <Spinner
          as='span'
          animation='border'
          size='sm'
          role='status'
          aria-hidden='true'
          style={{marginRight: '0.5rem'}}
        />
          {loadingText}
        </> :
        <>
          <CenteredIcon icon={icon} style={{color: color ?? 'black'}}/>
          {label}
        </>}
    </Dropdown.Item>
  );
}
