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

import { Component, Input } from '@angular/core';
import { Constants } from '../constants';
import { AEMAllowedComponentsContainerComponent } from '../aem-allowed-components-container/aem-allowed-components-container.component';

/**
 * @private
 */
const PLACEHOLDER_CLASS_NAMES = 'aem-Grid-newComponent';

/**
 * @private
 */
const RESPONSIVE_GRID_TYPE = 'wcm/foundation/components/responsivegrid';

@Component({
  selector: 'aem-responsivegrid',
  host: {
      '[class]': 'hostClasses',
      '[attr.data-cq-data-path]': 'cqPath'
  },
  templateUrl: './aem-responsivegrid.component.html'
})
/**
 * The current class carries the base presentational logic of the AEM Layout Container (aka. Responsive grid)
 */
export class AEMResponsiveGridComponent extends AEMAllowedComponentsContainerComponent {
  /**
   * Class names associated with the current responsive grid
   */
  @Input() gridClassNames: string;
  /**
   * Map of class names corresponding to each child of the current responsive grid
   */
  @Input() columnClassNames: {[key: string]: string};
  /**
   * Class names of the current component
   */
  @Input() classNames: string;
  /**
   * Current number of columns of the grid
   */
  @Input() columnCount: number;

  /**
   * Returns the column class names for a given column
   * @param itemKey - The key of the column item
   */
  getColumnClassNames(itemKey: string): string {
    return this.columnClassNames && this.columnClassNames[itemKey];
  }

  /**
   * Returns the placeholder classes
   */
  getPlaceholderClassNames(): string {
    return super.getPlaceholderClassNames() + ' ' + PLACEHOLDER_CLASS_NAMES;
  }

  /**
   * Returns the class names of the responsive grid based on the data from the cqModel
   */
  getHostClassNames(): string {
    let classNames = super.getHostClassNames();

    if (this.classNames) {
        classNames += ' ' + (this.classNames || '');
    }

    return classNames + ' ' + this.gridClassNames;
  }

  /**
   * Returns the aggregated path of this container path and the provided path
   *
   * @param path - the provided path to aggregate with the container path
   */
  getAttrDataPath(path: string): string | null {
    const item = this.getItem(path);

    if (item && item[Constants.TYPE_PROP] === RESPONSIVE_GRID_TYPE) {
      // We don't want to add the path for the wrapper for a reponsivegrid
      // The reponsivegrid adds the path on it's own
      return null;
    }

    return this.getDataPath(path);
  }
}
