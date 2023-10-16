# Challenge 2: Web Scraping

In this challenge, you will build a scraping tool similar to one that our actual customers use. Given a list of Y Combinator ("YC") companies, your task is to scrape their public pages on the YC website and extract structured data about each.

## Task

Complete the `processCompanyList` function in `challenge.ts`. You are encouraged to make as many helper functions as you need; you can put these in whatever files you like.

Your ultimate goal is to deliver a finished JSON file, stored in the `out/` folder.

## Constraints

- You must use TypeScript, with explicit typing for every variable and function.
- You must use a functional, immutable code style. That means using only `const`s, and no `let`s or `var`s (unless `let` is absolutely necessary).
- You may `npm install` whatever new libraries you like, although most of the ones you'll need have already been added to `package.json` for you.

## Instructions

1. Parse the given list of company names and URLs from `inputs/companies.csv`.
2. Using the scraping library [Crawlee](https://crawlee.dev/), scrape each company's YC profile page (the URL is provided in the CSV). You'll want to use the `CheerioCrawler`.
3. Using [Cheerio](https://cheerio.js.org/) (an HTML parsing library that uses jQuery's API), extract key information about each company into some structured TypeScript `interface`; you'll see some suggested fields below. YC companies' pages follow a pretty predictable format, but we suggest looking at a few companies to look for variations.
4. If a company's "Launch" post is available, visit that URL and scrape it as well. Extract that information into another well-structured TypeScript `interface`.
5. Combine all the information about each company into a single `interface`. Write the resulting array of objects (one object per company) to `out/scraped.json`.

Note that our `.gitignore` will ignore the `out/` folder; this is by design.

## Data schema

Part of this challenge is designing a useful, informative schema for YC companies, so we won't give you the full interface that you're expected to build. However, we'll give you a few ideas to start with. Here's a small subset of the information you should be able to gather about [Fiber AI](https://www.ycombinator.com/companies/fiber-ai):

```ts
{
    name: "Fiber AI",
    founded: "2023",
    teamSize: 5,
    jobs: [
        {
            role: "Founding Full Stack Engineer",
            location: "New York, NY, US",
            // ...
        }
    ],
    founders: [
        {
            name: "Adi Agashe",
            linkedIn: "https://linkedin.com/in/adityaagashe",
            // ...
        }
    ],
    launchPosts: [
        {
            title: "🤝 Fiber AI - Drive revenue growth faster with AI-powered marketing automations",
            // ...
        }
    ],
    // ...
}
```

In general, **the more information you can extract, the better!** As the above example suggests, you should get information about:

- Core company details (name, description, founding year, etc.)
- Founders ([here's an example company with news stories](https://www.ycombinator.com/companies/doordash))
- Jobs, if any (just get job information available on the company's main page; you don't need to visit the job details page)
- News stories, if any
- Launch post, if any

Note that not all companies will have all this information. Our `inputs/companies.csv` file covers a wide range of companies, so make sure your algorithm is able to handle all of them. Feel free to look up some of the companies in that CSV to see how their pages are structured.

## Tips

We recommend using the following Node.js modules:

- `crawlee`
- `cheerio`
- `fast-csv` or `papaparse`
- `fs/promises`
- `fs-extra`

Any non-built-in modules have been already added to `package.json`.

To extract structured information about a company from a pile of HTML tags, you'll need to use Cheerio's jQuery-like API. [This jQuery cheatsheet](https://htmlcheatsheet.com/jquery/) may come in handy. As you're developing your algorithm, you may want to use "Inspect Element" on [some example YC page](https://www.ycombinator.com/companies/fiber-ai) to see what the HTML structure usually looks like.

We highly recommend reading [Crawlee's quickstart guide](https://crawlee.dev/docs/quick-start) and their [Cheerio crawler guide](https://crawlee.dev/docs/guides/cheerio-crawler-guide).

## Do this to impress us

Some tips to make your submission stand out:

- Create many small, standalone helper functions.
- Use a lot of comments, including commenting atop each helper function to explain what it does. VSCode can auto-generate JSDoc comments for you ((see this guide)[https://stackoverflow.com/a/42805312]), which are very helpful.
- Use Promises and `async`/`await` rather than callbacks.
- Use functional constructs like `map`, `reduce`, and `filter` rather than imperative `for` loops.
- Use TypeScript generics wherever they're helpful.
- Use TypeScript interfaces whenever possible.
- Use [Prettier](https://prettier.io/) to auto-format your code. They have a great [VSCode plugin](https://github.com/prettier/prettier-vscode).
- Configure Crawlee to avoid getting rate-limited or IP-banned.
- Extract and structure as much data as you possibly can from the HTML pages!

## Getting started

To start the challenge, run these:

```sh
npm install
npm install --global tsx
```

Be sure you're using Node version 18 or greater.

## Testing

To test your code, do:

```sh
tsx runner.ts
```

Feel free to make other `.ts` files for testing purposes; you can run them all with `tsx`.

You should also run `npx tsc` to ensure your code passes all the TypeScript compiler's checks. The TypeScript compiler we've set up in this repo is fairly strict.

## Evaluation

We will run the following commands to test your code, starting in the `challenge-2` folder:

```sh
npm install
tsx runner.ts
```

We will expect your code to output a properly structured JSON file at `out/scraped.json`. We will run your code exactly once, so be sure your code works correctly, end-to-end, in one shot.

Before you submit, be sure that you get the right result when you run exactly these commands. You may want to delete your `node_modules/` and `out/` folders to simulate the "clean-room" run we'll do; remember that none of those folders will be saved to GitHub, so we won't get your copies.
