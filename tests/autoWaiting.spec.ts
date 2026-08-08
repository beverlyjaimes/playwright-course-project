import {test, expect} from '@playwright/test'

test.beforeEach(async({page}, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button triggering AJAX Request').click()
    //another option to override timeout 
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test('auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')

    // await successButton.click()

    // const text = await successButton.textContent()

    // await successButton.waitFor({state: "attached"})
    // const text = await successButton.allTextContents()

    // expect(text).toEqual('Data loaded with AJAX get request.')
        // expect(text).toContain('Data loaded with AJAX get request.')

        //can override the timeout
        await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('alternative waits', async({page}) => {
    const successButton = page.locator('.bg-success')

    // wait for element 
    // await page.waitForSelector('.bg-success')

    // wait for particular response 
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    // wait for network calls to be completed (not recommended )
    await page.waitForLoadState('networkidle')
        const text = await successButton.allTextContents()
        expect(text).toContain('Data loaded with AJAX get request.')

})

//Global Timeout -> Test Timeout -> Action Timeout, Navigation Timeout, Expect Timeout 

test('timeouts', async ({page}) => {
    // test.setTimeout(10000)
    //increases default timeout 3x 
    test.slow()
    //run test in Test Explorer 
    const successButton = page.locator('.bg-success')
    await successButton.click({timeout: 16000})

    // you can customize timeouts in playwright.config file 
})