const core = require('@actions/core');
const _7z =  require('7zip-min');

async function run() {
  try { 
    const source = core.getInput('pathSource');
    const target = core.getInput('pathTarget');
    const args = core.getInput('args');

    const _7zargs = ['a'];

    if (args != null) {

      for (const a of args.split(/ +/)) {
        _7zargs.push(a);
      }
    }

    _7zargs.push(target, source);

    core.info("packing " + source + " into " + target);
    const err = await new Promise((resolve, _) => {
      _7z.cmd(_7zargs, function(e) {
          resolve(e);
        });
    });

    if (err !== null) {
      core.setFailed("create 7z archive failed: " + err);
      return;
    }
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
