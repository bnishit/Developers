var pdf= require('pdfkit');
var fs= require('fs');

var myDoc =new pdf;
myDoc.pipe(fs.createWriteStream('node.pdf'));

myDoc.font('Times-Roman')
myDoc.fontSize(48);
myDoc.text( 'NodeJS PDF Document', 100,100);

myDoc.end();
