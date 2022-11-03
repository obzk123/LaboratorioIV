import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { 
  }

  SubirImagen(file:any)
  {
    const storage = getStorage();
    const imgRef = ref(storage, "images/" + file.name);
    return uploadBytes(imgRef, file);
  }

  async GetImagen(path:string)
  {
    let imagen = null;
    const storage = getStorage();
    const imagesRef = ref(storage, 'images');

    await listAll(imagesRef).then( m =>
      {
        for(let i = 0; i < m.items.length; i++)
        {
          if(m.items[i].fullPath == path)
          {
            imagen = getDownloadURL(m.items[i]);
            break;
          }
        }
      })
      
    return imagen;
  }
}
