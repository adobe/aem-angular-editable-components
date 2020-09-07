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

import { MapTo, EditConfig } from "../layout/component-mapping";

import { Component1 } from "./test-comp1.component";
import { Component2 } from "./test-comp2.component";
import { Component3 } from "./test-comp3.component";
import { AEMResponsiveGridComponent } from "../layout/aem-responsivegrid/aem-responsivegrid.component";
import { TestCompProperties } from './test-comp.type';

const config:EditConfig<TestCompProperties> = {
    isEmpty: (props) => !! props.title
};

MapTo<TestCompProperties>("app/components/comp1")(Component1,config);
MapTo<TestCompProperties>("app/components/comp2")(Component2,config);
MapTo<TestCompProperties>("app/components/comp3")(Component3,config);
MapTo<TestCompProperties>('wcm/foundation/components/responsivegrid')(AEMResponsiveGridComponent);
