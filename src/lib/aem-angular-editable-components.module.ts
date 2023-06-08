/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { NgModule } from '@angular/core';
import { AEMComponentDirective } from './layout/aem-component.directive';
import { AEMModelProviderComponent } from './layout/aem-model-provider/aem-model-provider.component';
import { AEMContainerComponent } from './layout/aem-container/aem-container.component';
import { AEMPageComponent } from './layout/aem-page/aem-page.component';
import { AEMResponsiveGridComponent } from './layout/aem-responsivegrid/aem-responsivegrid.component';
import { CommonModule } from '@angular/common';
import { AEMAllowedComponentsContainerComponent } from './layout/aem-allowed-components-container/aem-allowed-components-container.component';
import { AEMRemoteComponent } from './layout/aem-remote/aem-remote.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AEMContainerComponent,
        AEMAllowedComponentsContainerComponent,
        AEMResponsiveGridComponent,
        AEMComponentDirective,
        AEMModelProviderComponent,
        AEMPageComponent,
        AEMRemoteComponent
    ],
    exports: [
        AEMContainerComponent,
        AEMAllowedComponentsContainerComponent,
        AEMResponsiveGridComponent,
        AEMComponentDirective,
        AEMModelProviderComponent,
        AEMPageComponent,
        AEMRemoteComponent
    ]
})
export class SpaAngularEditableComponentsModule {}
