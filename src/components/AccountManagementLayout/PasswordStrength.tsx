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
        x = 'Weak - Crack Time = ';
        break;
      case 1:
        x = 'Weak - Crack Time = ';
        break;
      case 2:
        x = 'Fair - Crack Time = ';
        break;
      case 3:
        x = 'Good - Crack Time = ';
        break;
      case 4:
        x = 'Strong - Crack Time = ';
        break;
      default:
        x = 'Weak - Crack Time = ';
        break;
    }
    // tslint:disable-next-line:prefer-template
    x = x + result.crack_times_display.offline_slow_hashing_1e4_per_second + '\n'
      + result.feedback.suggestions + '\n'
      + result.feedback.warning;
    return x;
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
