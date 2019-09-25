import * as React from 'react';
import {Component} from 'react';
import zxcvbn, {ZXCVBNResult} from 'zxcvbn';

interface PasswordStrengthProps {
  password: string;
}
export default class PasswordStrength extends Component<PasswordStrengthProps> {
  createPasswordLabel(result: ZXCVBNResult) {
    switch (result.score) {
      case 0:
        return 'Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return 'Weak';
    }
  }
  render() {
    const { password } = this.props;
    const testedResult = zxcvbn(password);
    return(
      <div className='password-strength'>
        <progress
          className={`password-strength-progress strength-${this.createPasswordLabel(testedResult)}`}
          value={testedResult.score}
          max='4'
        />
        <br />
        <label className='password-strength-label'>
          {password && (
            <>
              <strong>Password strength:</strong> {this.createPasswordLabel(testedResult)}
              </>
          )}
        </label>
      </div>
    );
  }
}
