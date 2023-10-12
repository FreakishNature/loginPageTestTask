export const passwordTestDataList = [
    {
      testCase: 'Not existing account, valid password',
      password: '!1234567',
      error: 'Invalid email or password'
    },
    {
      testCase: 'Empty password Field',
      password: '',
      error: 'Password is required'
    },
    {
      testCase: 'Sql injection test',
      password: "' OR '1'='1",
      error: 'Invalid email or password'
    },
    {
      testCase: 'Invalid Email address (Multiple \'@\' symbols)',
      password: '11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
      error: 'Invalid email or password'
    }
  ];