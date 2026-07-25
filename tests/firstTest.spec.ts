import {expect, test} from '@playwright/test'


test.beforeEach(async ({page}) => {
      await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

})


test('Locator syntax rules', async({page}) => {
    //by Tag name
   await page.locator('input').first().click()

    //by iD
    // await page.locator('#inputEmail').click()

    //by Class
    page.locator('.shape-rectangle')

    //by attribute 
    page.locator('[placeholder="Email"]')

    //by entire class value(full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine selectors put them together without a space it will look for a match that has all 
    page.locator('input[placeholder="Email"]')

    //by xpath(NOT RECOMMENDED BY PLAYWRIGHT)
    page.locator('//')

    //by partial text match
    page.locator(':text("Using")')

    //by text exact match
    page.locator(':text-is("Using the Grid")')
})

test ('User facing locators', async({page}) => {

//    await page.getByRole('textbox', {name:"Email"}).first().click()

//    await page.getByRole('button', {name: "Sign in"}).first().click()

//    await page.getByLabel('Email').first().click()

//    await page.getByPlaceholder('Jane Doe').first().click()

//    await page.getByText('Using the Grid').first().click()

   await page.getByTitle('Iot Dashboard').first().click()

   //using source code you can add data-testd=""

   await page.getByTestId('whatever it is').first().click()
})

test ('Locating child elements', async({page}) =>{
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    //combine

    await page.locator('nb-card').getByRole('button', {name: 'Sign In'} ).first().click()

    //can also use index with nth(3) but NOT recommended 

})

test ('Locating parent elements', async({page}) => {
    // await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name:"Email"}).click()
    // await page.locator('nb-card', {has: page.locator('#InputEmail1')}).getByRole('textbox', {name:"Email"}).click()

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name:"Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name:"password"}).click()

      await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign In"}).click()

      //can also be used but is NOT recommended .locator("..") to go one level up
})

test ('Reusing the locators', async({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailFeild = basicForm.getByRole('textbox', {name: "Email"})

    // await basicForm.getByRole('textbox', {name: "Email"}).fill('test@test.com')
    await emailFeild.fill('testing@email.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()
    await expect(emailFeild).toHaveValue('testing@email.com')

})

test ('Extracting Values', async ({page}) =>{
    //single test value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()

    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain('Option 1')

    //input value 
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill("test@test.com")
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@testsdfs.com')

    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')

})

test('Assertions', async({page}) => {
     const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')

    //General assertions
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual("Submit")

    //Locator assertion - waits up to 5 seconds for the element to be available compared to general 
    await expect(basicFormButton).toHaveText('Submit')

    //Soft assertion - test will continue even if the assertion fails 
    //considered bad practice but can be used 
    await expect.soft(basicFormButton).toHaveText('Submit5')

    await basicFormButton.click()
    console.log('clicked button')
})