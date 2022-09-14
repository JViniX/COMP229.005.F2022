function parent() {
   const message = 'Hello World';

   function child() {
      alert (message);
   }

   console.log('Pass here');
   return child;
}

const childFN = parent();
childFN();