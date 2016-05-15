var qr = require('qr-image');

var img = qr.image(text);
img.pipe(res);
