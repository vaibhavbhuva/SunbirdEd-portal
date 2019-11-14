import { Injectable } from '@angular/core';

@Injectable(
// {
//   providedIn: 'root'
// }
)
export class Ckeditor4ConfigService {

  constructor() { }
  public getConfig() {
    return {
      customConfig: '/assets/libs/ckeditor4/custom-config.js'
    };
  }
}
