export const emailTestDataList = [
    {
      testCase: 'Valid Email Address',
      email: 'user@example.com',
      error: 'None'
    },
    {
      testCase: 'Empty Email Field',
      email: '',
      error: 'Invalid email address'
    },
    {
      testCase: 'Invalid Email Format (Missing \'@\')',
      email: 'invalid-email.com',
      error: 'Invalid email address'
    },
    {
      testCase: 'Invalid Email address (Multiple \'@\' symbols)',
      email: 'user@invalid@example.com',
      error: 'Invalid email address'
    },
    {
      testCase: 'Invalid Email address (Missing Domain)',
      email: 'user@',
      error: 'Invalid email address'
    },
    {
      testCase: 'Valid Email with Subdomain',
      email: 'user@sub.example.com',
      error: 'None'
    },
    {
      testCase: 'Email with Spaces (Invalid)',
      email: 'user name@example.com',
      error: 'Invalid email address'
    },
    {
      testCase: 'Email with Special Characters (Valid)',
      email: 'user123!@example.co.uk',
      error: 'None'
    },
    {
      testCase: 'Email with Uppercase Characters (Valid)',
      email: 'User@Example.com',
      error: 'None'
    },
    {
      testCase: 'Email with Long Domain Name',
      email: 'user@verylongdomainnameexample.com',
      error: 'None'
    },
    {
      testCase: 'Email with International Characters (Valid)',
      email: 'user@exämple.com',
      error: 'None'
    },
    {
      testCase: 'Email with Valid TLD',
      email: 'user@example.travel',
      error: 'None'
    },
    {
      testCase: 'Email with IP Address Domain (Valid)',
      email: 'postmaster@[123.123.123.123]',
      error: 'None'
    },
    {
      testCase: 'Email with emojis',
      email: 'I❤️CHOCOLATE🍫@example.com',
      error: 'None'
    },
    {
      testCase: 'Email more than 255 characters(Invalid)',
      email: 'a@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com',
      error: 'Invalid email address'
    },
    {
      testCase: 'Email with Multiple \'@\' symbols (Invalid)',
      email: 'user@invalid@example@domain.com',
      error: 'Invalid email address'
    },
    {
      testCase: 'Email with Unusual Special Characters (Valid)',
      email: 'user!@example.com',
      error: 'None'
    },
    {
      testCase: 'Email with Leading and Trailing Whitespace (Invalid)',
      email: ' user@example.com ',
      error: 'Invalid email address'
    },
    {
      testCase: 'email with special character dash',
      email: 'us-er@example.com',
      error: 'None'
    },
    {
      testCase: 'email with special character plus',
      email: 'us+er@example.com',
      error: 'None'
    },
    {
      testCase: 'email with special character underscore',
      email: 'us_er@example.com',
      error: 'None'
    },
    {
      testCase: 'email with special character underscore after @',
      email: 'user@_example.com',
      error: 'Invalid email address'
    }  ,
    {
      testCase: 'email with special character underscore at the end',
      email: 'user@example.com_',
      error: 'Invalid email address'
    }
  ];