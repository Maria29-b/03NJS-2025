const fs = require('fs');
fs.readFile('text.txt','utf8' , (err, data )=>{
if (err) {
console.error("erreur de lecture :", err);
}else {
console.log("contenu du fichier :", data );
}
});
