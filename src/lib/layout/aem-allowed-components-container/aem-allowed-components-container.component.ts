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
import { AEMContainerComponent } from '../aem-container/aem-container.component';

export const ALLOWED_PLACEHOLDER_CLASS_NAMESALLOWED_PLACEHOLDER_CLASS_NAMESALLOWED_PLACEHOLDER_CLASS_NAMESALLOWED_PLACEHOLDER_CLASS_NAMESALLOWED_PLACEHOLDER_CLASS_NAMESALLOWED_PLACEHOLDER_CLASS_NAMES = 'aem-AllowedComponent--list';
export const ALLOWED_COMPONENT_TITLE_CLASS_NAMES = 'aem-AllowedComponent--title';
export const ALLOWED_COMPONENT_PLACEHOLDER_CLASS_NAMES = 'aem-AllowedComponent--component cq-placeholder placeholder';

@Component({
  selector: 'aem-allowed-components-container',
  templateUrl: './aem-allowed-components-container.component.html',
  styleUrls: ['./aem-allowed-components-container.component.css']
})
export class AEMAllowedComponentsContainerComponent extends AEMContainerComponent {

  @Input() title: string;

  @Input() emptyLabelemptyLabel: string = 'No allowed components';

  @Input() allowedComponents: {
    applicable: boolean,
    components
  };

  isAllowedComponentsApplicable() {
    return this.isInEditMode && this.allowedComponents && this.allowedComponents.applicable;
  }

  getAllowedComponentListPlaceholderClassNames() {
    return super.getPlaceholderClassNames() + ' ' + ALLOWED_PLACEHOLDER_CLASS_NAMES;
  }

  getAllowedComponentListLabel() {
    const hasComponents = this.allowedComponents && this.allowedComponents.components && this.allowedComponents.components.length > 0;
    return hasComponents ? this.title : this.emptyLabel;
  }

  getAllowedComponents() {
    return this.allowedComponents && this.allowedComponents.components || [];
  }

  get allowedComponentListTitleClassNames() {
    return ALLOWED_COMPONENT_TITLE_CLASS_NAMES;
  }

  get allowedComponentClassNames() {
    return ALLOWED_COMPONENT_PLACEHOLDER_CLASS_NAMES;
  }
}
