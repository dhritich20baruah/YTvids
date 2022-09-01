const fs = require('fs')

function deleteFile(filepath){
    console.log
    fs.unlink('filepath', function(err){
        if(err) throw err;
        console.log('File deleted')
    })
}