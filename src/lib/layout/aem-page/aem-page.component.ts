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

import { Component } from '@angular/core';
import { AEMContainerComponent } from '../aem-container/aem-container.component';

/**
 * @private
 */
const PAGE_MODEL_SEPARATOR = '/jcr:content/';

@Component({
  selector: 'aem-page',
  host: {
      '[class]': 'hostClasses',
      '[attr.data-cq-data-path]':'cqPath'
  },
  templateUrl: '../aem-container/aem-container.component.html'
})
/**
 * The current component carries the base presentational logic of page component
 */
export class AEMPageComponent extends AEMContainerComponent {
  /**
   * Returns the aggregated path of this container path and the provided path
   *
   * @param path - the provided path to aggregate with the container path
   */
  getDataPath(path) {
    return this.cqPath ? this.cqPath + PAGE_MODEL_SEPARATOR + path : path;
  }

}

