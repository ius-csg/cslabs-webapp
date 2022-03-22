import {Form} from 'react-bootstrap';

export function PasswordRequirements() {
  return (
    <Form.Text className='text-muted'>
      We require a strong password for using our system.
      To increase the password strength, add numbers, special character, and increase password length.
    </Form.Text>
  );
}
