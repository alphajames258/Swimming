import puppeteer from 'puppeteer';
import { setToFirebase } from './firebase/firebase';
import {
  middleschool,
  MIDDLESCHOOL_100_IM_2023_2024,
  MIDDLESCHOOL_50_BACK_2023_2024,
  MIDDLESCHOOL_50_BREAST_2023_2024,
  MIDDLESCHOOL_50_FLY_2023_2024,
  MIDDLESCHOOL_50_FREE_2023_2024,
  NYC_50_FREE_2023_2024,
  SWIM_CLOUD,
} from './firebase/constants';

interface Swimmer {
  name: string;
  profileLink: string;
  organization: string;
  time: string;
}

const sleep = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();

  const allSwimmerData: Swimmer[] = [];

  const mEvent = MIDDLESCHOOL_100_IM_2023_2024;
  const event = middleschool[mEvent];

  const url = event.link;

  // Navigate to the current page
  await page.goto(url);

  // Loop through pages 1 to 14
  for (let pageNum = 1; pageNum <= event.pages; pageNum++) {
    // Construct the URL with the current page number

    await page.waitForSelector('tbody');

    // Extract swimmer data for the current page
    const swimmerData = await page.evaluate(() => {
      const tbody = document.querySelectorAll('tbody')[0];
      const rows = tbody.querySelectorAll('tr');
      const result: Swimmer[] = [];

      for (let i = 0; i < rows.length; i++) {
        let swimmer = rows[i].children;

        const swimmerData: Swimmer = {
          name: '',
          profileLink: '',
          organization: '',
          time: '',
        };
        const name = swimmer[1]?.querySelector('a')?.innerText ?? '';
        const profileLink = swimmer[1]?.querySelector('a')?.href ?? '';
        const organization = swimmer[2]?.querySelector('a')?.innerText ?? '';
        const time = swimmer[4]?.querySelector('a')?.innerText ?? '';

        swimmerData.name = name;
        swimmerData.profileLink = profileLink;
        swimmerData.organization = organization;
        swimmerData.time = time;

        result.push(swimmerData);
        console.log(swimmerData, 'anthony swimmer data');
      }
      return result;
    });

    const lastPaginationSelector =
      '.c-pagination .c-pagination__item:nth-child(8) .c-pagination__action';

    // Wait for the last pagination button to be available in the DOM
    await page.waitForSelector(lastPaginationSelector);

    // Click on the last pagination button
    await page.click(lastPaginationSelector);

    // Add swimmer data from the current page to the overall array
    allSwimmerData.push(...swimmerData);

    console.log(`Data from page ${pageNum} collected.`);
  }

  console.log(allSwimmerData, 'All swimmer data collected');
  await setToFirebase(SWIM_CLOUD, mEvent, allSwimmerData);

  await browser.close();
})();
