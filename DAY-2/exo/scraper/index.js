const cheerio = require('cheerio');
const fs = require('fs');

async function fetchData() {
  
  const $ = await cheerio.fromURL('https://blogcelebre.fr/50-celebres-acteurs-americains-agir-legendes-de-lamerique/?utm_source=chatgpt.com');
  
  
  const tableR = $('tr');
  const data = [];


  tableR.each((index, element) => {
    if (index ===0 ) return ;
    const columns = $(element).find('td');
    if (columns.length > 1) { 
      const numero = $(columns[0]).text().trim();  
      const acteur = $(columns[1]).text().trim();  
      const date_naissance = $(columns[2]).text().trim(); 
      const lieu_naissance = $(columns[3]).text().trim();  

      
      data.push({
        numero,
        acteur,
        date_naissance,
        lieu_naissance
      });
    }
  });


  fs.writeFile('acteurs.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Erreur lors de l\'écriture du fichier', err);
    } else {
      console.log('Les données ont été enregistrées dans acteurs.json');
    }
  });
}


fetchData();

