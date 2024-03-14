import { PdfReader } from "pdfreader";

export async function readDonors(){
  const donorsPDF = './pdfs/eb-donors.pdf';
  const donorRawData = await parsePDF(donorsPDF)
  const donors = []
  for(let i = 3; i < donorRawData.length; i = i + 3){
    let date = donorRawData[i].text;
    let name = donorRawData[i+1].text;
    let amount = parseInt(donorRawData[i+2].text.replace(/\,/g,""));
    donors.push({ date, name, amount })
  }
  console.log(donors)
  return donors;
}

export async function readAcceptors(){
  const acceptorsPDF = './pdfs/eb-acceptors.pdf';
  const acceptorsRawData = await parsePDF(acceptorsPDF)
  const acceptors = []
  for(let i = 4; i < acceptorsRawData.length; i = i + 3){
    let date = acceptorsRawData[i].text;
    let name = acceptorsRawData[i+1].text;
    let amount = parseInt(acceptorsRawData[i+2].text.replace(/\,/g,""));
    acceptors.push({ date, name, amount })
  }
  return acceptors;
}



async function parsePDF(path){
  let items = []
  items = await new Promise( (resolve, reject) => {
    new PdfReader().parseFileItems(path, (err, item) => {
      if (err) reject(err)
      else if (!item) resolve(items)
      else if (item.text) items.push(item)
    });
  })
  return items;
}
