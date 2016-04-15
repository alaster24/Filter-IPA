# Filter-IPA
Repository for the IPA of Alaster Sulejmani from *the 4th of April until the 15th of April*

## Getting Started
- Install [node.js](https://nodejs.org/en/)
- Install [postgresql](http://www.postgresql.org/download/)
- Create database named 'products'
- Download the product data from [balder](https://balder.pthor.ch/media/exports/csv/product-feed-full.csv) and place it in `server/resources/`
- Run `npm install`
- Run `npm start`

## Page

Browse to `http://127.0.0.1:3000/` in order to see the page

## Environment Variables

|Name|Function|Example|
|---|---|---|
|`DATABASE_URL`| Full URL of Database | postgres://postgres:@localhost:5432/products |
