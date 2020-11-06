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

import {Component, ComponentFactoryResolver, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TestProperties} from "../../layout/component-mapping.spec";

@Component({
    selector: 'lazy-comp',
    template: `<div>{{ some }}</div>`
})
/**
 * The current class carries the base presentational logic of the AEM Layout Container (aka. Responsive grid)
 */
export class LazyComponent{
    @Input() cqPath: string;
    @Input() isInEditor: boolean;
    @Input() some: string;

}

export default LazyComponent;