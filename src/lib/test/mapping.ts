/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2018 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
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
