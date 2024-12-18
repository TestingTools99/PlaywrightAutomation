 export class StringGenerator 
 {
    static generateRandomString(prefix:string, length:number):string
    {
       const charcters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
       let randomstring = ""

       for(let i=0;i<length;i++)
       {
         const randomIndex = Math.floor(Math.random() * charcters.length);
         randomstring+=charcters[randomIndex]
       }

       return `${prefix}${randomstring}`;
    }
 }
