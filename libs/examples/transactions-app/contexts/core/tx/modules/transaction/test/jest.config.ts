/* eslint-disable */
export default {
  displayName:
    'examples-transactions-app-contexts-core-tx-modules-transaction-test',
  preset: '../../../../../../../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../../../../../../coverage/libs/examples/transactions-app/contexts/core/tx/modules/transaction/test',
}
