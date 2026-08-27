import { test } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigation-page"; 
import { FormLayoutsPage } from "../page-objects/form-layouts-page";
import { DatepickerPage } from "../page-objects/datepicker-page";
test.beforeEach(async ({page}) =>{
    await page.goto('https://playground.bondaracademy.com/')

})

test('Navigate to form layouts page', async ({page}) =>{
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.smartTablePage()
})


test('Parametrized page object methods', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    const formLayoutsPage = new FormLayoutsPage(page)
    const datepickerPage = new DatepickerPage(page)
    await navigateTo.formLayoutsPage()
    await formLayoutsPage.submitUsingTheGridForm('test1@test.com', 'Welcome1', 'Option 1')
    await formLayoutsPage.submitInlineForm('Bev Puente', 'testinline@email.com', false)
    await navigateTo.datePickerPage()
    await datepickerPage.selectCommonDatePickerFromToday(2)
    await datepickerPage.selectDatePickerWithRange(2,2)
})

