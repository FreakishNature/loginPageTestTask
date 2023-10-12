import { Page } from "@playwright/test"
import { BaseElement } from "./BaseElement";

export abstract class BaseUI{
    name: string
    page: Page

    constructor(name: string, page: Page){
        this.name = name;
        this.page = page;
    }   
}
