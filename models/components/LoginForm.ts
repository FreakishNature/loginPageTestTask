import { Page } from "@playwright/test";
import { BaseElement } from "../../ui/BaseElement";

export class LoginForm extends BaseElement{
    invalidEmailFormatMessage: string = "Invalid email address";
    invalidPasswordFormatMessage: string = "";
    invalidEmailOrPasswordMessage: string = "Invalid email or password";

    emailInput: BaseElement;
    emailInputParentDiv: BaseElement;
    errorMessageTextEmail: BaseElement;
    errorMessageTextPassword: BaseElement;
    passwordInput: BaseElement;
    nextButton: BaseElement;
    loginButton: BaseElement;
    signUpButton: BaseElement;
    passwordRecoveryButton: BaseElement;
    backToLoginButton: BaseElement;
    proccessingButton: BaseElement;
    sendRecoveryLinkButton: BaseElement;
    submitMessageText: BaseElement;

    constructor(selector: string, name: string, page: Page,  parent: BaseElement | null = null){
        super(selector,name,page,parent);

        this.emailInput = new BaseElement("//input[contains(@name,'email')]", 'emailInput', this.page, this);
        this.emailInputParentDiv = new BaseElement("//input[contains(@name,'email')]/parent::div", 'emailInputParentDiv', this.page);
        this.passwordInput = new BaseElement("//input[contains(@name,'password')]", 'passwordInput', this.page, this);
        this.nextButton = new BaseElement("//button[contains(@data-test-component,'nextButton')]", 'nextButton', this.page, this);
        this.loginButton = new BaseElement("//button[contains(@data-test-component,'loginButton')]", 'loginButton', this.page, this);
        this.signUpButton = new BaseElement("//button[contains(@data-test-component,'signUpButton')]", 'signUpButton', this.page, this);
        this.errorMessageTextEmail = new BaseElement("(//div[contains(@data-test-component,'field__error errorMessage')])[1]", 'errorMessageText', this.page, this);
        this.errorMessageTextPassword = new BaseElement("(//div[contains(@data-test-component,'field__error errorMessage')])[2]", 'errorMessageText', this.page, this);
        this.passwordRecoveryButton = new BaseElement("//*[contains(@data-test-component,'passwordRecovery')]", 'passwordRecoveryButton', this.page, this);
        this.backToLoginButton = new BaseElement("//*[contains(text(),'Back')]", 'backToLoginButton', this.page);
        this.proccessingButton = new BaseElement("//button[contains(@class,'button--proccessing')]", 'proccessingButton', this.page, this);
        this.sendRecoveryLinkButton = new BaseElement("//button[contains(@data-test-component,'passwordRecoveryPage__sendButton')]", 'sendRecoveryLinkButton', this.page, this);
        this.submitMessageText = new BaseElement("//div[contains(@data-test-component,'passwordRecoveryPage__submitMessage')]", 'sendRecoveryLinkButton', this.page);
    
        
    }
}