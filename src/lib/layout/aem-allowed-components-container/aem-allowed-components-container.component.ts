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
import { AEMContainerComponent, AEMContainerComponentProperties } from '../aem-container/aem-container.component';

/**
 * @private
 */
export const ALLOWED_PLACEHOLDER_CLASS_NAMES = 'aem-AllowedComponent--list';

/**
 * @private
 */
export const ALLOWED_COMPONENT_TITLE_CLASS_NAMES = 'aem-AllowedComponent--title';

/**
 * @private
 */
export const ALLOWED_COMPONENT_PLACEHOLDER_CLASS_NAMES = 'aem-AllowedComponent--component cq-placeholder placeholder';

/**
 * Component that is allowed to be used on the page by the editor
 */
export interface AllowedComponent {
  /**
   * Path to the component under apps
   */
  path: string;

  /**
   * Title of the component
   */
  title: string;
}

/**
 * AllowedComponents collection
 */
export interface AllowedComponents {
  applicable: boolean;

  /**
   * List of allowed components
   */
  components: AllowedComponent[];
}

/**
 * Properties for the allowed components container
 */
export interface AEMAllowedComponentsContainerComponentProperties extends AEMContainerComponentProperties {
  /**
   * List of allowed components for the container
   */
  allowedComponents: AllowedComponents;

  /**
   *  Label to display when there are no allowed components
   */
  _allowedComponentPlaceholderListEmptyLabel?: string;

  /**
   * Title of the placeholder list
   */
  title: string;
}

@Component({
  selector: 'aem-allowed-components-container',
  templateUrl: './aem-allowed-components-container.component.html',
  styleUrls: [ './aem-allowed-components-container.component.css' ]
})
export class AEMAllowedComponentsContainerComponent extends AEMContainerComponent implements AEMAllowedComponentsContainerComponentProperties{

  @Input() title: string;

  @Input() emptyLabel = 'No allowed components';

  @Input() allowedComponents: {
    applicable: boolean,
    components
  };

  isAllowedComponentsApplicable(): boolean {
    return this.isInEditMode && this.allowedComponents && this.allowedComponents.applicable;
  }

  getAllowedComponentListPlaceholderClassNames(): string {
    return super.getPlaceholderClassNames() + ' ' + ALLOWED_PLACEHOLDER_CLASS_NAMES;
  }

  getAllowedComponentListLabel(): string {
    const hasComponents = this.allowedComponents && this.allowedComponents.components && this.allowedComponents.components.length > 0;

    return hasComponents ? this.title : this.emptyLabel;
  }

  getAllowedComponents(): AllowedComponent[] {
    return this.allowedComponents && this.allowedComponents.components || [];
  }

  get allowedComponentListTitleClassNames(): string {
    return ALLOWED_COMPONENT_TITLE_CLASS_NAMES;
  }

  get allowedComponentClassNames(): string {
    return ALLOWED_COMPONENT_PLACEHOLDER_CLASS_NAMES;
  }
}
