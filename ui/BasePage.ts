import { Page } from "@playwright/test";
import { BaseUI } from "./BaseUI";

export class BasePage extends BaseUI {
    constructor(name: string, page: Page){
        super(name,page);
    }
}