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
        await expect(usingTheGridEmailInput).toHaveValue(/emai.com/)
    })


})