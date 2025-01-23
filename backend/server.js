// Import the required BigQuery library
const express = require("express");
const cors = require("cors");
const { BigQuery } = require("@google-cloud/bigquery");

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

app.post("/datewise", async (req, res) => {
  const { from, to } = req.body;
  console.log(from,to)
  try {
    // Wait for the date extraction to complete
    fromDate = await extractDate(from);
    toDate = await extractDate(to);
    console.log(fromDate,toDate) // Corrected variable name

    console.log(fromDate, toDate);
    await initializeDataNormal();
    console.log(data);

    // Send JSON response back with status 200
    res.send({ data });
  } catch (error) {
    console.log("Error extracting dates", error);
    res.status(500).json({ error: "Failed to extract dates" });
  }
});

// Create a BigQuery client
const bigquery = new BigQuery({
  keyFilename:
    "C:/Users/adhav/OneDrive/Desktop/quickCommerce/hopeful-history-405018-bee125474176.json", // Path to your service account key file
  projectId: "hopeful-history-405018", // Your Google Cloud Project ID
});
const categoryWise = false;

async function connectAndQueryBigQuery() {
  const datasetId = "Quickcommerce"; // Replace with your dataset ID
  const tableId = "product_performance_data"; // Replace with your table ID

  // const query = `
  //   SELECT *
  //   FROM \`${bigquery.projectId}.${datasetId}.${tableId}\`
  //   WHERE processed_date = '2025-01-18'
  // `;
  const query = `
  SELECT *
  FROM \`${bigquery.projectId}.${datasetId}.${tableId}\`
  WHERE processed_date BETWEEN '${fromDate}' AND '${toDate}'
`;

  try {
    // Run the query
    const [rows] = await bigquery.query({ query });
    data = rows;

    console.log("succesfully fetched");
  } catch (error) {
    console.error("Error running query:", error);
  }
}

function aggregateByCategory(data) {
  return data.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = {
        total_products: 0,
        total_atc: 0,
        total_clicks: 0,
        total_impressions: 0,
        total_orders: 0,
        total_revenue: 0,
        total_spend: 0,
        average_cpm: 0,
        average_ctr: 0,
        average_roas: 0,
        campaign_ids: new Set(),
        products: [],
      };
    }

    const category = acc[product.category];
    category.total_products++;
    category.total_atc += product.atc;
    category.total_clicks += product.clicks;
    category.total_impressions += product.impressions;
    category.total_orders += product.orders;
    category.total_revenue += product.revenue;
    category.total_spend += product.spend;
    category.campaign_ids.add(product.campaign_id);
    category.products.push(product);

    // Recalculate averages
    category.average_cpm =
      category.products.reduce((sum, p) => sum + p.cpm, 0) /
      category.products.length;
    category.average_ctr =
      category.products.reduce((sum, p) => sum + p.ctr, 0) /
      category.products.length;
    category.average_roas =
      category.products.reduce((sum, p) => sum + p.roas, 0) /
      category.products.length;

    return acc;
  }, {});
}

// Execute the function
async function initializeDataCategoryWise() {
  try {
    await connectAndQueryBigQuery();
    // Now bigQueryData contains your query results

    console.log("Data is ready:", data.length, "rows");
    const aggregatedData = aggregateByCategory(data);
    console.log(aggregatedData);
  } catch (error) {
    console.error("Failed to initialize data:", error);
  }
}
async function initializeDataNormal() {
  try {
    await connectAndQueryBigQuery();
    // Now bigQueryData contains your query results

    console.log("Data is ready:", data.length, "rows");
    console.log(data);
  } catch (error) {
    console.error("Failed to initialize data:", error);
  }
}

if (categoryWise) {
  console.log("CategoryWise request");
  // initializeDataCategoryWise();
} else {
  console.log("Normal Data");
  // initializeDataNormal();
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
