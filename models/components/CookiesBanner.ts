import { Page } from "@playwright/test";
import { BaseElement } from "../../ui/BaseElement";

export class CookiesBanner extends BaseElement {
    acceptButton: BaseElement;
    learnMoreLink: BaseElement;

    constructor(selector: string, name: string, page: Page,  parent: BaseElement | null = null){
        super(selector,name,page,parent);
        
        this.acceptButton = new BaseElement("//button[contains(@data-test-component,'acceptButton')]","acceptButton", this.page, this);
        this.learnMoreLink = new BaseElement("//span[contains(text(), 'Learn more')]","learnMoreLink", this.page, this);
    }
}