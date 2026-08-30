import { Page } from "@playwright/test";
import { HelperBase } from "./helper-base";
import { step } from "../helpers/test-step-decorator";


export class FormLayoutsPage extends HelperBase {
    // private readonly page: Page 

    constructor(page:Page) {
        // this.page = page
        super(page)
    }

    @step
    async submitUsingTheGridForm(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
        await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password)
        await usingTheGridForm.getByLabel('Option 1').check({force: true})
        await usingTheGridForm.getByRole('button', {name: "Sign in"}).click()
    }

    /**
     * method annotation
     * Method submits inline form user name, emai, and remember me 
     *
     * @param fullName -valid user name 
     * @param email - valid test email
     * @param rememberMeCheckbox 
     */

    @step
    async submitInlineForm(fullName: string, email: string, rememberMeCheckbox: boolean) {
        const inlineForm = this.page.locator('nb-card', {hasText: "Inline form"})
        await inlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(fullName)
        await inlineForm.getByRole('textbox', {name: "Email"}).fill(email)
        if(rememberMeCheckbox) {
            await inlineForm.getByRole('checkbox').check({force: true})
        }
                await inlineForm.getByRole('button', {name: "Submit"}).click()

    }
    
}