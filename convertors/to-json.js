import { readDonors, readAcceptors } from '../reader.js'
import * as fs from 'fs'
import * as path from 'path'
export async function Convert(dir) {
  try {
    console.log("Parsing Donors:")
    const donorFilePath = path.resolve(`${dir}/donors.json`)
    fs.rmSync(donorFilePath,{ force: true})
    const donors = await readDonors();
    console.log(`Parsing Donors Successful!, Writing to ${donorFilePath}`)
    fs.writeFileSync(donorFilePath, JSON.stringify(donors, null, 2))

    console.log("Parsing Acceptors:")
    const acceptorsFilePath = path.resolve(`${dir}/acceptors.json`)
    fs.rmSync(acceptorsFilePath, { force: true})
    const acceptors = await readAcceptors();
    console.log(`Parsing Acceptors Successful, Writing to ${acceptorsFilePath}`)
    fs.writeFileSync(acceptorsFilePath, JSON.stringify(acceptors, null, 2))
    console.log("Success!")
  } catch (e) {
    console.error(`Failed to convert, error: ${e.message}`);
  }
}