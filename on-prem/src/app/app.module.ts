import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppConfigService } from './services/config/app-config.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgxHeatmapModule } from 'ngx-heatmap';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { StarterAppComponent } from './routes/starter-app/starter-app.component';
import { SplashComponent } from './routes/splash/splash.component';

import { HomeComponent } from './routes/home/home.component';
import { IotHomeCockpitComponent } from './components/iot-home-cockpit/iot-home-cockpit.component';
import { IotGatewayComponent } from './components/iot-gateway/iot-gateway.component';
import { IotGatewayDetailsComponent, SensorDirective } from './components/iot-gateway-details/iot-gateway-details.component';
import { IotGatewayOverviewComponent } from './components/iot-gateway-details-charts/iot-gateway-overview/iot-gateway-overview.component';
import { IotGatewayTimeSeriesComponent } from './components/iot-gateway-details-charts/iot-gateway-time-series/iot-gateway-time-series.component';
import { IotGatewayLocationComponent } from './components/iot-gateway-details-charts/iot-gateway-location/iot-gateway-location.component';
import { IotGatewayXyzValueComponent } from './components/iot-gateway-details-charts/iot-gateway-xyz-value/iot-gateway-xyz-value.component';
import { IotGatewayImageComponent } from './components/iot-gateway-details-charts/iot-gateway-image/iot-gateway-image.component';
import { IotGatewayMapComponent } from './components/iot-gateway-details-charts/iot-gateway-map/iot-gateway-map.component';
import { IotGatewayDiscreteValueComponent } from './components/iot-gateway-details-charts/iot-gateway-discrete-value/iot-gateway-discrete-value.component';
import { IotGatewayDescriptionsComponent } from './components/iot-gateway-details-charts/iot-gateway-descriptions/iot-gateway-descriptions.component';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { GraphService } from './services/graph/graph.service';
import { DgraphService } from './services/graph/dgraph.service';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { IotGatewayTextComponent } from './components/iot-gateway-details-charts/iot-gateway-text/iot-gateway-text.component';
import { MaporamaComponent } from './components/maporama/maporama.component';
import { IotGatewayEndpointComponent } from './components/iot-gateway-endpoint/iot-gateway-endpoint.component';
import { IgeModelsComponent } from './components/iot-gateway-endpoint/ige-models/ige-models.component';
import { IgeDataStoresComponent } from './components/iot-gateway-endpoint/ige-data-stores/ige-data-stores.component';
import { IgeProtocolsComponent } from './components/iot-gateway-endpoint/ige-protocols/ige-protocols.component';
import { IotPipelineComponent } from './components/iot-pipeline/iot-pipeline.component';
import { ReteEditorModule } from './components/rete/rete.module';
import { PipelineConfigComponent } from './components/iot-pipeline/pipeline-config/pipeline-config.component';
import { PipelineDataPublisherComponent } from './components/iot-pipeline/pipeline-data-publisher/pipeline-data-publisher.component';
import { PipelineDataStoreComponent } from './components/iot-pipeline/pipeline-data-store/pipeline-data-store.component';
import { PipelineDataSubscriberComponent } from './components/iot-pipeline/pipeline-data-subscriber/pipeline-data-subscriber.component';
import { PipelineFilteringComponent } from './components/iot-pipeline/pipeline-filtering/pipeline-filtering.component';
import { PipelineFlogoFlowComponent } from './components/iot-pipeline/pipeline-flogo-flow/pipeline-flogo-flow.component';
import { PipelineInferencingComponent } from './components/iot-pipeline/pipeline-inferencing/pipeline-inferencing.component';
import { PipelineRestServiceComponent } from './components/iot-pipeline/pipeline-rest-service/pipeline-rest-service.component';
import { PipelineRuleExpressionComponent } from './components/iot-pipeline/pipeline-rule-expression/pipeline-rule-expression.component';
import { PipelineRulesComponent } from './components/iot-pipeline/pipeline-rules/pipeline-rules.component';
import { PipelineStreamingComponent } from './components/iot-pipeline/pipeline-streaming/pipeline-streaming.component';
import { IotDataPipelineComponent } from './components/iot-data-pipeline/iot-data-pipeline.component';
import { DataFilteringComponent } from './components/iot-data-pipeline/data-filtering/data-filtering.component';
import { DataFilteringViewComponent } from './components/iot-data-pipeline/data-filtering-view/data-filtering-view.component';
import { DataStoresComponent } from './components/iot-data-pipeline/data-stores/data-stores.component';
import { DataStoresViewComponent } from './components/iot-data-pipeline/data-stores-view/data-stores-view.component';
import { DataStreamingComponent } from './components/iot-data-pipeline/data-streaming/data-streaming.component';
import { DataStreamingViewComponent } from './components/iot-data-pipeline/data-streaming-view/data-streaming-view.component';
import { ProtocolsComponent } from './components/iot-data-pipeline/protocols/protocols.component';
import { ProtocolsViewComponent } from './components/iot-data-pipeline/protocols-view/protocols-view.component';
import { IotEdgeDataPipelineComponent } from './components/iot-edge-data-pipeline/iot-edge-data-pipeline.component';
import { FilteringComponent } from './components/iot-edge-data-pipeline/filtering/filtering.component';
import { InferencingComponent } from './components/iot-edge-data-pipeline/inferencing/inferencing.component';
import { RulesComponent } from './components/iot-edge-data-pipeline/rules/rules.component';
import { IotGatewayDashboardComponent } from './components/iot-gateway-dashboard/iot-gateway-dashboard.component';
import { SpotfireDashboardComponent } from './components/spotfire-dashboard/spotfire-dashboard.component';
import { IotInfraDeployerComponent } from './components/iot-infra-deployer/iot-infra-deployer.component';
import { IotNotificationsComponent } from './components/iot-notifications/iot-notifications.component';
import { IotStoreSimulatorComponent } from './components/iot-simulator/iot-store-simulator/iot-store-simulator.component';
import { IotTextileSimulatorComponent } from './components/iot-simulator/iot-textile-simulator/iot-textile-simulator.component';
import { IotDashboardComponent } from './components/iot-dashboard/iot-dashboard.component';
import { InfraRegistrationComponent } from './components/iot-infra-deployer/infra-registration/infra-registration.component';
import { InfraDeployerComponent } from './components/iot-infra-deployer/infra-deployer/infra-deployer.component';
import { SingleValueDialogComponent } from './components/iot-pipeline/pipeline-dialog/single-value-dialog.component';
import { CommonModule } from 'common';

const appInitializerFn = (appConfig: AppConfigService) => {
    return () => {
        return appConfig.loadAppConfig();
    };
};

@NgModule({
  declarations: [
    AppComponent,
    StarterAppComponent,
    SplashComponent,
    HomeComponent,
    IotHomeCockpitComponent,
    IotGatewayComponent,
    NavBarComponent,
    IotGatewayDetailsComponent,
    SensorDirective,
    IotGatewayDescriptionsComponent,
    IotGatewayOverviewComponent,
    IotGatewayTimeSeriesComponent,
    IotGatewayLocationComponent,
    IotGatewayXyzValueComponent,
    IotGatewayImageComponent,
    IotGatewayMapComponent,
    IotGatewayDiscreteValueComponent,
    IotGatewayTextComponent,
    MaporamaComponent,
    IotGatewayEndpointComponent,
    IgeModelsComponent,
    IgeDataStoresComponent,
    IgeProtocolsComponent,
    IotPipelineComponent,
    PipelineConfigComponent,
    PipelineDataPublisherComponent,
    PipelineDataStoreComponent,
    PipelineDataSubscriberComponent,
    PipelineFilteringComponent,
    PipelineFlogoFlowComponent,
    PipelineInferencingComponent,
    PipelineRestServiceComponent,
    PipelineRuleExpressionComponent,
    PipelineRulesComponent,
    PipelineStreamingComponent,
    IotDataPipelineComponent,
    DataFilteringComponent,
    DataFilteringViewComponent,
    DataStoresComponent,
    DataStoresViewComponent,
    DataStreamingComponent,
    DataStreamingViewComponent,
    ProtocolsComponent,
    ProtocolsViewComponent,
    IotEdgeDataPipelineComponent,
    FilteringComponent,
    InferencingComponent,
    RulesComponent,
    IotGatewayDashboardComponent,
    SpotfireDashboardComponent,
    IotInfraDeployerComponent,
    IotNotificationsComponent,
    IotStoreSimulatorComponent,
    IotTextileSimulatorComponent,
    IotDashboardComponent,
    InfraRegistrationComponent,
    InfraDeployerComponent,
    SingleValueDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxHeatmapModule,
    Ng2GoogleChartsModule,
    ReteEditorModule,
    NgChartsModule,
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService],
    },
    DatePipe,
    { provide: GraphService, useClass: DgraphService },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
