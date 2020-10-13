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

import { MapTo } from '../layout/component-mapping';

import { Test1Component } from './test-comp1.component';
import { Test2Component } from './test-comp2.component';
import { Test3Component } from './test-comp3.component';
import { AEMResponsiveGridComponent } from '../layout/aem-responsivegrid/aem-responsivegrid.component';

MapTo('app/components/comp1')(Test1Component);
MapTo('app/components/comp2')(Test2Component);
MapTo('app/components/comp3')(Test3Component);
MapTo('wcm/foundation/components/responsivegrid')(AEMResponsiveGridComponent);
