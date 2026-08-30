import { Page } from "@playwright/test";

export class HelperBase {
    protected readonly page: Page 

    constructor(page: Page) {
        this.page = page
    }

    async getToastrMessage(){
        //this method validates toasts and gets message 

        return "I'm a toastr!"
    }
}