import { loadFeature, defineFeature } from 'jest-cucumber';
import puppeteer from 'puppeteer';


describe('show/hide an event details', () => {

   // Set the global timeout for this test to 30 seconds (30000 milliseconds)
   //jest.setTimeout(30000);
    let browser;
    let page;
    beforeAll(async () => {   
        browser = await puppeteer.launch({
            headless: true,
            //slowMo: 250, // slow down by 250ms,
            timeout: 0 // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
        });
        page = await browser.newPage();
        await page.goto('http://localhost:5173/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('An event element is collapsed by default', async () => {
    
        // If your event's details have a different selector, use it instead of .event .details
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
      });
    
    test('User can expand an event to see its details', async () => {
        await page.click('.event .detail-btn');
    
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide details', async () => {
        await page.click('.event .detail-btn');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });
});