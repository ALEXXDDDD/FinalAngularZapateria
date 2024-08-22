import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AppModule } from './app/app.module';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
