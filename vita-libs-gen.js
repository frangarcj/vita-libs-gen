#!/usr/bin/env node

var path = require('path');
var pkg = require( path.join(__dirname, 'package.json') );



// Parse command line options

var program = require('commander');

program
    .version(pkg.version)
    .option('-p, --port <port>', 'Port on which to listen to (defaults to 3000)', parseInt)
    .parse(process.argv);

var port = program.port || 3000;


var fs = require('fs');
var obj = JSON.parse(fs.readFileSync(path.join(__dirname,'library.json')));
for(var i in obj) {
  var library = obj[i];
  console.log(library.name);
  for(var j in library.modules){
    var sce_module =library.modules[j];
    var sText = ".arch armv7−a\n";

    //console.log(sce_module.functions.length);
    if(sce_module.functions.length>0){
      sText += "@ export functions\n";
      sText += "\t.section .vitalink.fstubs,\"ax\",%progbits\n";
      sText +="\t.align 2\n";
      for(var h in sce_module.functions){
        var sce_function = sce_module.functions[h];
        if(sce_function.kernel){
          continue;
        }
        sText +="@export "+sce_function.name+"\n";
        sText +="\t.global "+sce_function.name+"\n";
        sText +="\t.type "+sce_function.name+", %function\n";
        sText +=sce_function.name+":\n";
        sText +="\t.word 0x"+library.nid.toString(16).toUpperCase()+"\n";
        sText +="\t.word 0x"+sce_module.nid.toString(16).toUpperCase()+"\n";
        sText +="\t.word 0x"+sce_function.nid.toString(16).toUpperCase()+"\n";
        sText +="\t.align 4\n";


      }
    }
    if(sce_module.variables.length>0){
      sText += "@ export variables\n";
      sText += "\t.section .vitalink.vstubs,\"awx\",%progbits\n";
      sText +="\t.align 2\n";
      for(var h in sce_module.variables){
        var sce_variable = sce_module.variables[h];
        sText +="@export "+sce_variable.name+"\n";
        sText +="\t.global "+sce_variable.name+"\n";
        sText +="\t.type "+sce_variable.name+", %object\n";
        sText +=sce_variable.name+":\n";
        sText +="\t.word 0x"+library.nid.toString(16).toUpperCase()+"\n";
        sText +="\t.word 0x"+sce_module.nid.toString(16).toUpperCase()+"\n";
        sText +="\t.word 0x"+sce_variable.nid.toString(16).toUpperCase()+"\n";
        sText +="\t.align 4\n";


      }
    }
    fs.writeFileSync(sce_module.name+".S",sText);
    console.log("Creating "+sce_module.name+".S");
  }
}
console.log('Cute files is running on port ' + obj);
