// Import the required BigQuery library
const express = require("express");
const cors = require("cors");
const fs = require("fs");

// Load JSON from a file
const jsonData = JSON.parse(fs.readFileSync("output.json", "utf-8"));

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Asynchronous function to extract the date in YYYY-MM-DD format
let fromDate = "2025-01-18";
let toDate = "2025-01-18";
let data = [];

async function extractDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-CA"); // 'en-CA' gives the date format YYYY-MM-DD
}

async function aggregateByCategory(data) {
  const result = data.reduce((acc, product) => {
    if (!acc[product.category_name]) {
      acc[product.category_name] = {
        category_name: product.category_name,
        mrp : 0, // Include category name for better array output
        total_products: 0,
        ad_atc: 0,
        ad_clicks: 0,
        ad_impressions: 0,
        ad_orders: 0,
        ad_revenue: 0,
        ad_spend: 0,
        discounted_selling_price : 0,
        gross_merchandise_value: 0,
        gross_selling_value: 0,
        stock_on_hand_sellable: 0,
        stock_on_hand_masterwarehouse: 0,
        total_units_sold:0,
        products: [],
      };
    }

    const category = acc[product.category_name];
    category.total_products++;
    category.mrp+=product.mrp;
    category.ad_atc += product.ad_atc;
    category.ad_clicks += product.ad_clicks;
    category.ad_impressions += product.ad_impressions;
    category.ad_orders += product.ad_orders;
    category.ad_revenue += product.ad_revenue;
    category.ad_spend += product.ad_spend;
    category.discounted_selling_price += product.discounted_selling_price;
    category.gross_merchandise_value += product.gross_merchandise_value;
    category.gross_selling_value += product.gross_selling_value;
    category.stock_on_hand_sellable += product.stock_on_hand_sellable;
    category.stock_on_hand_masterwarehouse +=
      product.stock_on_hand_masterwarehouse;
    category.total_units_sold += product.total_units_sold;
    category.products.push(product);

    // Recalculate averages
    

    return acc;
  }, {});

  // Convert the object to an array
  return Object.values(result);
}

app.post("/datewise", async (req, res) => {
  const { from, to, cond } = req.body;
  console.log(req.body)
  console.log(from, to, cond);
  try {
    // Wait for the date extraction to complete
    fromDate = await extractDate(from);
    toDate = await extractDate(to);
    if (cond === true) {
      const result = await aggregateByCategory(jsonData);
      res.json({
        data: result,
        message: "successfully pullled categorywise data",
      });
    } else {
      res.status(200).json({ data: jsonData, message: "successful" });
    }
    // await initializeDataNormal();

    // Send JSON response back with status 200
  } catch (error) {
    console.log("Error extracting dates", error);
    res.status(500).json({ error: "Failed to extract dates" });
  }
});

// Create a BigQuery client



// const result =  aggregateByCategory(jsonData)
// console.log(result)
// Execute the function

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
