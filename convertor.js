import { parseArgs } from "node:util";
import * as ToCSV from './convertors/to-csv.js'
import * as ToJSON from './convertors/to-json.js'

const args = parseArgs({
  options: {
    format: {
      type: "string",
      short: "f",
      default: "csv"
    },
    output: {
      type: "string",
      short: "o",
      default: "./output"
    }
  },
});


async function convert() {
  const format = args.values.format;
  if (!format){
    console.error("Missing Format")
  }
  let output = args.values.output;
  if (!output){
    console.error("Invalid or missing output")
  }
  output = `${output}/${format}`
  switch (format.toLowerCase()) {
    case "csv":
      await ToCSV.Convert(output)
      break;
    case "json":
      await ToJSON.Convert(output)
      break;
    default:
      console.error("Invalid Format")
  }
}

await convert()