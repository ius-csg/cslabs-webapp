import { init as initApm } from '@elastic/apm-rum';
const apm = initApm({
  // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  serviceName: 'CSLabs-Frontend',
  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: 'http://localhost:8200',
  // Set service version (required for sourcemap feature)
  serviceVersion: '',
  // Set agent activity, use to deactivate in staging env
  // can also set it randomly with Math.random() < 0.1
  active: true,
  // used to set environment (prod, dev) or while testing use the developers name.
  environment: '',
  // Possible levels are: trace, debug, info, warn, error
  logLevel: 'warn'
});

export default apm;
