/**
 * The entry point function. This will read the provided CSV file, scrape the companies'
 * YC pages, and output structured data in a JSON file.
 */
import Crawlee from 'crawlee';
import fs from 'fs/promises';
import fastcsv from 'fast-csv';
import { CheerioCrawler } from 'crawlee';

export async function processCompanyList() {
  /**
   * Put your code here!
   */

async function parseCompanyData() {
  const fileContents = await fs.readFile('inputs/companies.csv', 'utf-8');
  const companies: { Company_name: string; YC_url: string; }[] = [];

  fastcsv.parseString(fileContents, { headers: true })
  .on('data', (row) => companies.push({
    Company_name: row["Company Name"],
    YC_url: row["YC URL"],
  }))
  .on('end', () => {
    // Now you have an array of companies with names and URLs
    // Call the next step in the process
    scrapeCompanyData(companies);
  });
}
// async function scrapeCompanyData(companies) {
//   const scrapedData: { Company_name: string; YC_url: string; }[] = [];
//   const crawler = new Crawlee();

//   // Configure the crawler, e.g., maximum concurrency
//   crawler.maxConcurrency = 5;

//   // Create a CheerioCrawler
//   const cheerioCrawler = new CheerioCrawler();

//   // Define the crawl handler
//   cheerioCrawler.addHandler(async ({ data, $ }) => {
//     const companyData = {
//       Company_name: data["Company Name"],
//       YC_url: data["YC URL"],
//       // Extract other information here using Cheerio selectors
//     };
//     scrapedData.push(companyData);
//   });

//   // Add the CheerioCrawler to the Crawlee instance
//   crawler.addCrawler(cheerioCrawler);

//   // Start crawling
//   const results = await crawler.crawl(companies);

//   // Process the results

//   return scrapedData;
  
// }  

async function scrapeCompanyData(companies) {
  const scrapedData: { Company_name: string; YC_url: string; }[] = [];
  const crawler = new Crawlee({
    maxConcurrency: 5, // Adjust this according to your needs
  });

  // Use the CheerioCrawler to scrape company data
  const results = await crawler.crawl({
    type: CheerioCrawler,
    data: companies,
    handler: async ({ data, $ }) => {
      const companyData = {
        Company_name: data["Company Name"],
        YC_url:data["YC URL"],

        // Extract other information here using Cheerio selectors
      };
      scrapedData.push(companyData);
    },
  });

  //Continue to the next step
  extractAdditionalData(scrapedData);
}
async function extractAdditionalData(scrapedData) {
  for (const company of scrapedData) {
    // Extract founders' information, job listings, news stories, and launch posts
    // Update the company object with this additional data
  }

  // Continue to the next step
  saveScrapedData(scrapedData);
}
async function saveScrapedData(scrapedData) {
  const outputData = JSON.stringify(scrapedData, null, 2);
  await fs.writeFile('out/scraped.json', outputData);

  console.log('Scraped data saved to "out/scraped.json".');
}

// Start the process by calling the first function
parseCompanyData();


}

