const fs = require('fs').promises;

fs.readFile('text.txt' , 'utf8')
.then(data => {
console.log("contenu du fichier :", data);
})
.catch(err => {
console.error("erreur de lecture :", err);
});
