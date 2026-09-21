import { test } from "@playwright/test";
import { PageManager } from "../page-objects/page-manager";


test.beforeEach(async ({page}) =>{
    await page.goto('https://playground.bondaracademy.com/')

})

test('Navigate to form layouts page', async ({page}) =>{
    const pom = new PageManager(page)

    await pom.navigateTo.formLayoutsPage()
    await pom.navigateTo.datePickerPage()
    await pom.navigateTo.toasterPage()
    await pom.navigateTo.smartTablePage()

})


test('Parametrized page object methods', async ({page}) => {

    const pom = new PageManager(page)

    await pom.navigateTo.formLayoutsPage()
    await pom.formLayoutsPage.submitUsingTheGridForm('test1@test.com', 'Welcome1', 'Option 1')
    await pom.formLayoutsPage.submitInlineForm('Bev Puente', 'testinline@email.com', false)
    await pom.navigateTo.datePickerPage()
    await pom.datepickerPage.selectCommonDatePickerFromToday(2)
    await pom.datepickerPage.selectDatePickerWithRange(2,2)
})

