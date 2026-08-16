import { expect, test } from '@playwright/test'
import { using } from 'rxjs'

test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/')
})

test.describe('From Layouts page', () => {

    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    
    test('Input fields', async ({ page }) => {
        const usingTheGridEmailInput = page
            .locator('nb-card', { hasText: "Using the Grid" })
            .getByRole('textbox', {name: "Email"})

        await usingTheGridEmailInput.fill('random@email.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('random2test@email.com', {delay: 500})

        //extract the value 
        const inputValue = await usingTheGridEmailInput.inputValue()

        //assertions

        await expect(usingTheGridEmailInput).toHaveValue('random2test@email.com')
        await expect(usingTheGridEmailInput).toHaveValue(/email.com/)
    })
    
    test('radio buttons', async({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})

        await usingTheGridForm.getByLabel('Option 1').check({force: true})
        await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force: true})
 
        //force makes app flaky becaue it deactivates delay


        const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()
        expect(radioStatus).toBeTruthy()

        await expect(usingTheGridForm.getByRole('radio', {name: "Option 2"})).toBeChecked()
        await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).not.toBeChecked()

    })

   test('checkboxes', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force:true})

    const allBoxes = page.getByRole('checkbox')
    for(const box of await allBoxes.all()){
        await box.uncheck({force: true})
        await expect(box).not.toBeChecked
    }
   })

   test('Lists and dropdowns', async({page}) => {
       await page.getByText('Modal & Overlays').click()
       await page.getByText('Toastr').click()

       //standard dropdowns
       await page.locator('.form-group', {hasText: 'Toast type:'}).getByRole('combobox').selectOption('danger')
       await expect(page.getByRole('combobox')).toHaveValue('danger')

       //custom dropdowns
        await page.locator('.form-group', {hasText: 'Position'}).locator('nb-select').click()
        
        console.log('wtf?')

        //option 1 
        //await page.getByRole('list').getByText('bottom-right').click()
        //option 2
        await page.locator('nb-option', {hasText: 'bottom-end'}).click()
        await expect( await page.locator('.form-group', {hasText: 'Position'}).locator('nb-select')).toHaveText('bottom-end')

    //looping through a list
    const positionDropDownField = page.locator('.form-group', {hasText: 'Position'}).locator('nb-select')
    await positionDropDownField.click()
    const allListValues = await page.locator('nb-option').allTextContents()
    for (const listValue of  allListValues ){
        await page.locator('nb-option', {hasText: listValue}).click()
        await expect(positionDropDownField).toHaveText(listValue)
        await positionDropDownField.click()

        
    }

   })
})

