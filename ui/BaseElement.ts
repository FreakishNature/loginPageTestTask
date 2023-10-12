import { Locator, Page } from "@playwright/test";
import { BaseUI } from "./BaseUI";

export class BaseElement extends BaseUI {
    selector: string;
    parent: BaseElement | null;

    constructor(selector: string, name: string, page: Page, parent: BaseElement | null = null){
        super(name,page);
        this.selector = selector;
        this.parent = parent;
    }

    public getRawElement(): Locator {
        return this.parent ? this.parent.getRawElement().locator(this.selector) : this.page.locator(this.selector)
    }

    public getSelector(): string {
        return String(this.getRawElement()).split("Locator@")[1]
    }

    public async waitUntilDisplayed(){
        await this.page.waitForSelector(this.getSelector());
    }

    public async waitUntilDissapeared(){
        await this.page.waitForSelector(this.getSelector(), {state: 'detached'})
    }
}