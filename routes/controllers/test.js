//test controller functions
foo = (req,res)=>{
    console.log('Test Router Running')
    async function f() {

        let promise = new Promise((resolve, reject) => {
          setTimeout(() => resolve("done!"), 1000)
        });
      
        let result = await promise; // wait till the promise resolves (*)
      
        console.log(req.session); // "done!"
      }
      
      f();
}

module.exports.foo = foo