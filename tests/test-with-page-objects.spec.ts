import { test } from "@playwright/test";
import { PageManager } from "../page-objects/page-manager";
import {faker } from '@faker-js/faker';


test.beforeEach(async ({page}) =>{
    await page.goto('/')

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
    const randomFullName = faker.person.fullName()
    const randomEmail = faker.internet.email({provider: 'test.com'})

    await pom.navigateTo.formLayoutsPage()
    await pom.formLayoutsPage.submitUsingTheGridForm(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!, 'Option 1')

       //screenshot 
    await page.screenshot({path: 'screenshots/formlayoutsPage.png'})
    await page.waitForTimeout(3000)

    const formLayoutPageBuffer = await page.screenshot()
    // console.log(formLayoutPageBuffer.toString('base64'))


    await pom.formLayoutsPage.submitInlineForm(randomFullName, randomEmail, false)
    await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/inlineFrom.png'})
    await pom.navigateTo.datePickerPage()
    await pom.datepickerPage.selectCommonDatePickerFromToday(2)
    await pom.datepickerPage.selectDatePickerWithRange(2,2)
    await pom.navigateTo.smartTablePage()
})

