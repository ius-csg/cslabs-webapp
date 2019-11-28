import * as React from 'react';
import {Component} from 'react';
import zxcvbn, {ZXCVBNResult} from 'zxcvbn';

interface PasswordStrengthProps {
  password: string;
}
export default class PasswordStrength extends Component<PasswordStrengthProps> {
  createPasswordLabel(result: ZXCVBNResult) {
    let x;
    switch (result.score) {
      case 0:
        return 'Weak - We require strong passwords';
      case 1:
        return 'Weak - We require strong passwords';
      case 2:
        return 'Fair - We require strong passwords';
      case 3:
        return 'Good - We require strong passwords';
      case 4:
        return 'Strong';
      default:
        return 'Weak - We require strong passwords';
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
