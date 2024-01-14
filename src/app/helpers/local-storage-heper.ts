export default class LocalStorageHelper{

  static setItemFromObject<T>(key:string,items:T):void{
    localStorage.setItem(key,JSON.stringify(items));
  }
  static getItemFormObject<T>(key:string){
    try{
      return JSON.parse(localStorage.getItem(key)!) as T
    }
    catch{
      this.clear(key);
    }

    return null;
  }

  static clear(key:string):void{
    if(!key){
      return;
    }
    localStorage.removeItem(key);
  }

}
