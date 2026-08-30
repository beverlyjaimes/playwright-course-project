import { Page } from "@playwright/test";
import { step } from "../helpers/test-step-decorator";
import { HelperBase } from "./helper-base";



export class NavigationPage extends HelperBase{

    constructor(page: Page){
        super(page)
    }
    @step
    async formLayoutsPage(){
        // await this.page.getByText('Forms').click()
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
        await this.getToastrMessage()
    }

    @step
    async datePickerPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
        const toastMsg = await this.getToastrMessage()
        console.log(toastMsg)
    }
    @step
    async toasterPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        // await this.page.getByText('Modal & Overlays').click()
        await this.page.getByText('Toastr').click()
    }
     @step
    async tooltipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }
    @step
    async smartTablePage(){
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()

    }

    private async selectGroupMenuItem(groupMenuTitle: string){
        const groupMenuItem = this.page.getByTitle(groupMenuTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded') 
        if (expandedState == 'false') {
            await groupMenuItem.click()
        }

    }
}