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

import { ComponentMapping as SPAComponentMapping } from '@adobe/aem-spa-component-mapping';

/**
 * The current class extends the @adobe/aem-spa-component-mapping#Mapto library and features with Angular specifics such as
 *
 * - Storing the editing configurations for each resource type
 */
export class ComponentMappingWithConfig {
  /**
   * Store of EditConfig structures
   */
  private editConfigMap = {};

  constructor(private spaMapping: SPAComponentMapping) {}

  /**
   * Stores a component class for the given resource types and also allows to provide an EditConfig object
   * @param resourceTypes - List of resource types
   * @param clazz - Component class to be stored
   * @param [editConfig] - Edit configuration to be stored for the given resource types
   */
  map(resourceTypes, clazz, editConfig = null) {
      const innerClass = clazz;

        if (editConfig) {
            this.editConfigMap[resourceTypes] = editConfig;
        }
        this.spaMapping.map(resourceTypes, innerClass);
    }

    /**
     * Stores a clazz the lazy way for dynamic imports / code splitting.function that returns a promise
     * @param resourceTypes - List of resource types
     * @param clazz - A function that returns a promise that resolves a Component class
     * @param [editConfig] - Edit configuration to be stored for the given resource types
     */
    lazyMap(resourceTypes, clazz: () => Promise<unknown>, editConfig = null) {
        const innerClass = clazz;

        if (editConfig) {
            this.editConfigMap[resourceTypes] = editConfig;
        }
        this.spaMapping.lazyMap(resourceTypes, innerClass);
    }

  /**
   * Returns the component class for the given resourceType
   * @param resourceType - Resource type for which the component class has been stored
   */
  get(resourceType: string): unknown {
    return this.spaMapping.get(resourceType);
  }

  /**
     * Returns the component class for the given resourceType
     * @param resourceType - Resource type for which the component class has been stored
     */
    lazyGet(resourceType: string): Promise<unknown> {
        return this.spaMapping.getLazy(resourceType);
    }

  /**
   * Returns the EditConfig structure for the given type
   * @param resourceType - Resource type for which the configuration has been stored
   */
  getEditConfig(resourceType: string) {
      return this.editConfigMap[resourceType];
  }
}

const componentMapping = new ComponentMappingWithConfig(SPAComponentMapping);

function MapTo(resourceTypes) {
    return (clazz, editConfig = null): any => {
        return componentMapping.map(resourceTypes, clazz, editConfig);
    };
}

function LazyMapTo(resourceTypes) {
    return (clazz: () => Promise<unknown>, editConfig = null) => {
        return componentMapping.lazyMap(resourceTypes, clazz, editConfig);
    };
}

export { componentMapping as ComponentMapping, MapTo, LazyMapTo };
