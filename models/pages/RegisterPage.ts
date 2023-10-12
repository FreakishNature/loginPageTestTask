import { Page } from "playwright-core";
import { BasePage } from "../../ui/BasePage";
import { BaseElement } from "../../ui/BaseElement";
import { LoginForm } from "../components/LoginForm";
import envVariablesConfig from "../../constants/envVariables.config";

export class RegisterPage extends BasePage {

    notFoundMessage: BaseElement;
    readonly PATH = '/register'; 
    constructor(page: Page){
        super("RegisterPage", page);
        this.notFoundMessage = new BaseElement('//h1', 'notFoundMessage', page);
    }

    public async navigate(){
        await this.page.goto(`${envVariablesConfig.TESTING_APP_HOST}/${this.PATH}`)
    }

}