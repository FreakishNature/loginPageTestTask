import { Page } from "playwright-core";
import { BasePage } from "../../ui/BasePage";
import { BaseElement } from "../../ui/BaseElement";
import { LoginForm } from "../components/LoginForm";
import envVariablesConfig from "../../constants/envVariables.config";

export class PrivacyAndPolicyPage extends BasePage {

    readonly PATH = '/privacy-policy'; 

    PrivacyAndPolicyHeader: BaseElement;

    constructor(page: Page){
        super("PrivacyAndPolicyPage", page);
        this.PrivacyAndPolicyHeader = new BaseElement("//h1[@data-test-component='text text--type-heading0']", 'PrivacyAndPolicyHeader', page);
    }
    
    public async navigate(){
        await this.page.goto(`${envVariablesConfig.TESTING_APP_HOST}/${this.PATH}`)
    }
}