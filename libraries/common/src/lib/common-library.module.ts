import { NgModule,APP_INITIALIZER } from '@angular/core';
import { CommonComponent } from './common.component';
import { CommonIotGatewayComponent } from './components/iot-gateway/iot-gateway.component';
import { CommonIotGatewayDetailsComponent, SensorDirective } from './components/iot-gateway-details/iot-gateway-details.component'
import { CommonIotGatewayOverviewComponent } from './components/iot-gateway-details-charts/iot-gateway-overview/iot-gateway-overview.component';
import { CommonIotGatewayTimeSeriesComponent } from './components/iot-gateway-details-charts/iot-gateway-time-series/iot-gateway-time-series.component';
import { CommonIotGatewayLocationComponent } from './components/iot-gateway-details-charts/iot-gateway-location/iot-gateway-location.component';
import { CommonIotGatewayXyzValueComponent } from './components/iot-gateway-details-charts/iot-gateway-xyz-value/iot-gateway-xyz-value.component';
import { CommonIotGatewayImageComponent } from './components/iot-gateway-details-charts/iot-gateway-image/iot-gateway-image.component';
import { CommonIotGatewayMapComponent } from './components/iot-gateway-details-charts/iot-gateway-map/iot-gateway-map.component';
import { CommonIotGatewayDiscreteValueComponent } from './components/iot-gateway-details-charts/iot-gateway-discrete-value/iot-gateway-discrete-value.component';
import { CommonIotGatewayDescriptionsComponent } from './components/iot-gateway-details-charts/iot-gateway-descriptions/iot-gateway-descriptions.component';
import { CommonIotGatewayTextComponent } from './components/iot-gateway-details-charts/iot-gateway-text/iot-gateway-text.component'
import { CommonMaporamaComponent } from './components/maporama/maporama.component';

// modules
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { FormsModule } from '@angular/forms'
import { NgChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
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
    CommonIotGatewayComponent,
    CommonIotGatewayDetailsComponent,
    CommonIotGatewayOverviewComponent,
    CommonIotGatewayTimeSeriesComponent,
    CommonIotGatewayLocationComponent,
    CommonIotGatewayXyzValueComponent,
    CommonIotGatewayImageComponent,
    CommonIotGatewayMapComponent,
    CommonIotGatewayDiscreteValueComponent,
    CommonIotGatewayDescriptionsComponent,
    CommonIotGatewayTextComponent,
    CommonMaporamaComponent,
    SensorDirective
  ],
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    Ng2GoogleChartsModule,
    FormsModule,
    NgChartsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonComponent,
    CommonIotGatewayComponent,
    CommonIotGatewayDetailsComponent,
    CommonIotGatewayOverviewComponent,
    CommonIotGatewayTimeSeriesComponent,
    CommonIotGatewayLocationComponent,
    CommonIotGatewayXyzValueComponent,
    CommonIotGatewayImageComponent,
    CommonIotGatewayMapComponent,
    CommonIotGatewayDiscreteValueComponent,
    CommonIotGatewayDescriptionsComponent,
    CommonMaporamaComponent,
    SensorDirective
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
