import { Page } from "playwright-core";
import { BasePage } from "../../ui/BasePage";
import { BaseElement } from "../../ui/BaseElement";
import { LoginForm } from "../components/LoginForm";
import envVariablesConfig from "../../constants/envVariables.config";
import { CookiesBanner } from "../components/CookiesBanner";

export class LoginPage extends BasePage {
    logo: BaseElement;
    loginForm: LoginForm;
    cookiesBanner: CookiesBanner;
    
    constructor(page: Page){
        super("LoginPage", page);

        this.logo = new BaseElement("//div[contains(@data-test-component,'gripLogo')]", 'logo', page);
        this.loginForm = new LoginForm("//form/parent::div", "loginForm", page);
        this.cookiesBanner = new CookiesBanner("//div[contains(@data-test-component,'cookiesConsentBanner')]", "cookiesBanner", page);
    }

    public async navigate(){
        await this.page.goto(`${envVariablesConfig.TESTING_APP_HOST}/login`)
    }

    public async login(email: string, password: string){
        await this.loginForm.emailInput.getRawElement().fill(email);
        await this.loginForm.nextButton.getRawElement().click();
        await this.loginForm.passwordInput.getRawElement().fill(password);
        await this.loginForm.loginButton.getRawElement().click();
    }

    public async getTitle(): Promise<string> {
        return await this.page.title()
    }
}