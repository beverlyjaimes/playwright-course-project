import { Page, expect } from "@playwright/test";

export class DatepickerPage {
    private readonly page: Page 

    constructor(page:Page) {
        this.page = page
    }
    
    async selectCommonDatePickerFromToday(daysFromToday: number ) {
         const calendarInputField = this.page.getByPlaceholder('Form Picker')
                await calendarInputField.click()
        
                //prefered to use a dynamic date 
                const date = new Date();
                date.setDate(date.getDate() + daysFromToday)
                const expectedDay = date.getDate().toString()
                //formatting date
                const expectedMonth = date.toLocaleString('En-US', {month: 'short'})
                const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
                const expectedYear = date.getFullYear()
                const expectedDate = `${expectedMonth} ${expectedDay}, ${expectedYear}`
        
                //let vs const to allow value to change
                let currentMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
                const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
        
                while(!currentMonthAndYear?.includes(expectedMonthAndYear)) {
                    await this.page.locator('.next-month').click()
                    currentMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
                }
        
        
                await this.page.locator('.day-cell:not(.bounding-month)').getByText(expectedDay, {exact: true}).click()
                await expect(calendarInputField).toHaveValue(expectedDate)
    }
}