import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environmentLocal } from 'src/constants/environment.local';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  private currentEnvironment: any;
  private environments: Object = {};

  constructor(@Inject(DOCUMENT) private document: any) {
    this.buildEnvironments();
    this.selectCurrentEnvironmentFromFrontUrl();
   }

   getCurrentEnvironment() {
     return this.currentEnvironment;
   }

   buildEnvironments() {
     this.addEnvironment(environmentLocal);
   }

   addEnvironment(environment : any) {
     this.environments[environment.frontUrl] = environment;
   }

   selectCurrentEnvironmentFromFrontUrl() {
     let url = this.getFrontUrl();
     this.currentEnvironment = this.environments[0];
     if (!this.currentEnvironment) {
       throw "No environment found"
     }
   }

   getFrontUrl(): String {
      let url = this.document.location.href;
      let index = url.indexOf("//");
      if (index !== -1) {
        url = url.substr(index + 2);
      }
      index = url.indexOf("/");
      if (index !== -1) {
        url = url.substr(0, index);
      }
      return url;
   }
}
