import { NgModule,APP_INITIALIZER } from '@angular/core';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { CommonComponent } from './common.component';
import { CommonIotGatewayComponent } from './components/iot-gateway/iot-gateway.component';

import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//services
import { AppConfigService } from './services/config/app-config.service';
import { EdgeService } from './services/edge/edge.service';
import { DgraphService } from './services/graph/dgraph.service';
import { DatastoreService } from './services/datastore/datastore.service';
import { GraphService } from './services/graph/graph.service'
import { DatePipe } from '@angular/common';

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
      return appConfig.loadAppConfig();
  };
};

@NgModule({
  declarations: [
    CommonComponent,
    CommonIotGatewayComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  exports: [
    CommonComponent,
    CommonIotGatewayComponent,

  ],
  providers: [
    AppConfigService,
    {
        provide: APP_INITIALIZER,
        useFactory: appInitializerFn,
        multi: true,
        deps: [AppConfigService],
    },
    EdgeService,
    DatastoreService,
    { provide: GraphService, useClass: DgraphService },
    DatePipe
  ]
})
export class CommonLibraryModule { }
