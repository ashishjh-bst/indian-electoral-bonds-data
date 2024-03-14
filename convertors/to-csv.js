import { readDonors, readAcceptors } from '../reader.js'
import * as fs from 'fs'
import * as path from 'path'
export async function Convert(dir) {
  try {
    console.log("Parsing Donors:")
    const donorFilePath = path.resolve(`${dir}/donors.csv`)
    fs.rmSync(donorFilePath,{ force: true})
    const donors = await readDonors();
    const donorsCSV = `date|name|amount\n${donors.map( donor => `${donor.date}|${donor.name}|${donor.amount}`).join("\n")}`;
    console.log(`Parsing Donors Successful!, Writing to ${donorFilePath}`)
    fs.writeFileSync(donorFilePath, donorsCSV)

    console.log("Parsing Acceptors:")
    const acceptorsFilePath = path.resolve(`${dir}/acceptors.csv`)
    fs.rmSync(acceptorsFilePath, { force: true})
    const acceptors = await readAcceptors();
    const acceptorsCSV = `date|name|amount\n${acceptors.map( acceptor => `${acceptor.date}|${acceptor.name}|${acceptor.amount}`).join("\n")}`;
    console.log(`Parsing Acceptors Successful, Writing to ${acceptorsFilePath}`)
    fs.writeFileSync(acceptorsFilePath, acceptorsCSV)
    console.log("Success!")
  } catch (e) {
    console.error(`Failed to convert, error: ${e.message}`);
  }
}