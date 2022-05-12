const { exec } = require("child_process");
const NodeCache = require( "node-cache" );

// Dataplan TTL set to env ttl or 5 minutes
const dataplanCache = new NodeCache({stdTTL: process.env.dataplanTTL || 300});

/**
 * This repo includes a non-global dependency of `mp` CLI tool
 * When running a command with node's "exec"
 * it automatically resolves to the local project's executables as desired
 */
const runCliCommand = async str => {
  return new Promise((res, rej) => {
    exec(str, (error, stdout, stderr) => {
      if (error) rej({ stdout, error, stderr });
      else res({ stdout, error, stderr });
    });
  });
}

const memoizeDataplan = async dataPlanId => {
  console.log(`... Downloading dataplan: ${dataPlanId}`);
  const cmd = `mp planning:data-plans:fetch --dataPlanId="${dataPlanId}"`;  
  const res = await runCliCommand(cmd);      
  const jsonResult = JSON.parse(res.stdout);  
  dataplanCache.set(dataPlanId, jsonResult);
}

module.exports.validate = async (jsonBatch, dataPlanId = '', dataPlanVersion = 1) => {
  let jsonResult,
      res;

  if(!dataplanCache.get(dataPlanId)) {
    try {
      await memoizeDataplan(dataPlanId);
    } catch(err) {
      return { valid: false, error: `Invalid dataplan: ${dataPlanId}`, detail: err}; 
    }
  }

  try {
    const dpArgs = `\
      --batch='${JSON.stringify(jsonBatch)}'\
      --dataPlan='${JSON.stringify(dataplanCache.get(dataPlanId))}'\
      --versionNumber ${dataPlanVersion}`;
    const commandStr = `mp planning:batches:validate ${dpArgs}`;
    res = await runCliCommand(commandStr);
  } catch (err) {
    return { valid: false , error: `Error running validation command: ${err.stderr}`};
  }

  try {
    jsonResult = JSON.parse(res.stdout);
  } catch (err) {
    return { valid: false, error: `Error parsing CLI response: ${err.stderr}` };
  }

  if (jsonResult.results.length) {
    return { valid: false, response: jsonResult };
  }
  else {
    return { valid: true };
  }
}

