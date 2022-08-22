import { join } from 'path';

const ROOT = `${process.cwd()}`;
const JEST_ENV = join(ROOT, 'test');

const configs = {
    verbose: true,
    automock: false,
    testMatch: [join(JEST_ENV, '/**/*.test.js')],
    testEnvironment: 'node',
    transform: {},
}

export default configs