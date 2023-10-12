import { test as base, expect, Page, Cookie } from '@playwright/test';
import { LoginPage } from '../models/pages/loginPage';
import envVariables from '../constants/envVariables.config';
import { RegisterPage } from '../models/pages/RegisterPage';
import { emailTestDataList } from '../testdata/emailTestCases';
import { passwordTestDataList } from '../testdata/passwordTestCases';
import { PrivacyAndPolicyPage } from '../models/pages/PrivacyAndPolicy';


const NOT_EXISTING_EMAIL = "mail@mail.com"

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

type PageFixture = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  privacyAndPolicy: PrivacyAndPolicyPage;
}

const test = base.extend<PageFixture>({
    loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
}, registerPage : async ({page}, use) => {
  await use(new RegisterPage(page));
}, privacyAndPolicy : async ({page}, use) => {
  await use(new PrivacyAndPolicyPage(page));
}});

test.use({ignoreHTTPSErrors: true})

function findCookieWithName(cookies: Array<Cookie>, name: string): Cookie {
  for (let cookie of cookies){
    return cookie;
  }
  throw new Error("Element not found error");
}

test.beforeEach(async ({loginPage})=>{  
  await test.step("Open login page", async () => {
    await loginPage.navigate();
  });
});

test('Login page succesfully displayed', async ({loginPage}) => {
  await test.step('Login page is displayed', async () => {
    let title = await loginPage.getTitle();
    expect(title).toEqual('Grip');
    await expect(loginPage.loginForm.getRawElement()).toBeVisible();
  })
});

test('Login using not existing mail', async ({loginPage}) => {
  await test.step("Enter not existing mail and click next", async () => { 
    await loginPage.loginForm.emailInput.getRawElement().fill(NOT_EXISTING_EMAIL);
    await loginPage.loginForm.nextButton.getRawElement().click();
  });
    
  await test.step("Enter password and click login", async () => { 
    await loginPage.loginForm.passwordInput.getRawElement().fill(NOT_EXISTING_EMAIL);
    await loginPage.loginForm.loginButton.getRawElement().click();
  });
    
  await test.step("Invalide email or password error message is shown", async () => { 
    await expect(loginPage.loginForm.errorMessageTextPassword.getRawElement())
    .toHaveText(loginPage.loginForm.invalidEmailOrPasswordMessage, {timeout: 20_000})
  });
});


test('Accept cookies', async({page, loginPage}) => {
  await test.step('Click on accept cookie button', async ()=> {  
    await loginPage.cookiesBanner.acceptButton.getRawElement().click();
  });

  await test.step('Wait until banner dissapeared', async () => {
    await loginPage.cookiesBanner.waitUntilDissapeared();
  });

  await test.step('Validate cookie value', async () => {
    await loginPage.cookiesBanner.waitUntilDissapeared();
    expect(findCookieWithName(await page.context().cookies(), 'grip-cookiesConsent').value).not.toEqual('dismiss');
  });
});

test('Sign up new account', async ({loginPage, registerPage}) => {
  await test.step('Click "Sign up" button', async () => {
    await loginPage.loginForm.signUpButton.getRawElement().click();
  });

  await test.step('Sign up page is displayed', async () => {
    await expect(registerPage.notFoundMessage.getRawElement()).not.toContainText('Not Found');
  });
});


for(let emailTestData of emailTestDataList){
  test(`Email input test case: ${emailTestData.testCase} email: ${emailTestData.email}`, async ({loginPage, page}) => {
    await test.step("Enter not existing mail and click next", async () => {
      await loginPage.loginForm.emailInput.getRawElement().fill(emailTestData.email);
      if(emailTestData.email == ''){
        await loginPage.loginForm.emailInput.getRawElement().fill('12345');  
        await loginPage.loginForm.emailInput.getRawElement().clear();  
      }
      await loginPage.logo.getRawElement().focus();
      await loginPage.logo.getRawElement().click({clickCount: 10});
      if (emailTestData.error != 'None'){
        await expect(loginPage.loginForm.errorMessageTextEmail.getRawElement()).toContainText(loginPage.loginForm.invalidEmailFormatMessage);
      } else {
        await expect(loginPage.loginForm.errorMessageTextEmail.getRawElement()).toBeEmpty();  
      }
    });
  });
}

for(let passwordTestData of passwordTestDataList){
  test(`Test password test case : ${passwordTestData.testCase} password: ${passwordTestData.password}`, async ({loginPage}) => {
    await test.step("Enter not existing mail and click next", async () => { 
      //TODO: should be replaced with existing mail and added test case with valid password
      await loginPage.loginForm.emailInput.getRawElement().fill(NOT_EXISTING_EMAIL);
      await loginPage.loginForm.nextButton.getRawElement().click();
    });
      
    await test.step("Enter password and click login", async () => { 
      if(passwordTestData.password != ''){
        await loginPage.loginForm.passwordInput.getRawElement().fill(passwordTestData.password);      
        await loginPage.loginForm.loginButton.getRawElement().click();
      } else {
        
        await loginPage.loginForm.passwordInput.getRawElement().fill("12345");
        await loginPage.loginForm.passwordInput.getRawElement().clear();
        await expect(loginPage.loginForm.errorMessageTextPassword.getRawElement())
        .toHaveText(passwordTestData.error, {timeout: 20_000})
      }
    });
      
    await test.step("Assert error if present", async () => { 
      if(passwordTestData.error != 'None'){
        await expect(loginPage.loginForm.errorMessageTextPassword.getRawElement())
        .toHaveText(passwordTestData.error, {timeout: 20_000})
      }
    });
  });
}


test('Forgot password', async ({loginPage}) => {
  await test.step("Enter not existing mail and click next", async () => { 
    await loginPage.loginForm.emailInput.getRawElement().fill(NOT_EXISTING_EMAIL);
    await loginPage.loginForm.nextButton.getRawElement().click();
  });

  await test.step("Click forgot password link", async () => { 
    await loginPage.loginForm.passwordRecoveryButton.getRawElement().click();
    await expect(loginPage.loginForm.emailInput.getRawElement()).toHaveValue(NOT_EXISTING_EMAIL);
    await loginPage.loginForm.sendRecoveryLinkButton.getRawElement().click();
  });

  await test.step("Submit message is displayed", async () => { 
    await expect(loginPage.loginForm.submitMessageText.getRawElement()).toBeAttached();
  });
    
  
  await test.step("Click back to login button", async () => { 
    await loginPage.loginForm.backToLoginButton.getRawElement().click();
    await expect(loginPage.loginForm.backToLoginButton.getRawElement()).toBeHidden(); 
  });
});



test('Forgot password edit email', async ({loginPage}) => {
  await test.step("Enter not existing mail and click next", async () => { 
    await loginPage.loginForm.emailInput.getRawElement().fill(NOT_EXISTING_EMAIL);
    await loginPage.loginForm.nextButton.getRawElement().click();
  });

  await test.step("Click on email field", async () => { 
    await loginPage.logo.getRawElement().focus();
    await loginPage.logo.getRawElement().click({clickCount: 10});
    await loginPage.loginForm.emailInputParentDiv.getRawElement().click()

    await expect(loginPage.loginForm.emailInput.getRawElement()).not.toHaveValue("");
  });
});

test('Click logo, go on main page', async ({loginPage}) => {
  await test.step("Enter not existing mail and click next", async () => { 
    await loginPage.logo.getRawElement().click();
  });
});

test('Erase cookies and refresh page', async ({loginPage}) => {

  await test.step('Click on accept cookie button', async ()=> {  
    await loginPage.cookiesBanner.acceptButton.getRawElement().click();
    await loginPage.cookiesBanner.waitUntilDissapeared();
  });

  await test.step("Clear cookies", async () => { 
    await loginPage.page.context().clearCookies()
    await loginPage.page.reload();
  });

  await test.step("Cookie accept bar appeared", async () => { 
    await loginPage.cookiesBanner.getRawElement().isVisible();
  });
});


test('Cookies learn more button', async ({loginPage, context}) => {

  const pagePromise = context.waitForEvent('page');

  await test.step('Click on learn more button', async ()=> {  
    // const pagePromise = context.waitForEvent('page');
    await loginPage.cookiesBanner.learnMoreLink.getRawElement().click();
    // await loginPage.page.waitForURL(`**${privacyAndPolicy.PATH}`)
  });

  await test.step("Opened Privacy Policy page", async () => { 
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    let privacyAndPolicy = new PrivacyAndPolicyPage(newPage);
    
    await expect(privacyAndPolicy.PrivacyAndPolicyHeader.getRawElement()).toHaveText('Privacy Policy');
  });

});


