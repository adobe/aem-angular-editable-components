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
import { Input, Type } from '@angular/core';

/**
 * Indicated whether force reload is turned on, forcing the model to be refetched on every MapTo instantiation.
 */
export interface ReloadForceAble {
  cqForceReload?: boolean;
}

/**
* MappedComponentProperties
* Properties given to every component runtime by the SPA editor.
*/
export interface MappedComponentProperties extends ReloadForceAble {
    /*
    Is the component being viewed in an editor context
     */
  isInEditor: boolean;
    /**
     * Path to the model associated with the current instance of the component
     */
  cqPath: string;

    /**
     * Angular item name
     */
  itemName: string;
}

export interface EditConfig<P extends MappedComponentProperties> {
  emptyLabel?: string;
  isEmpty(props: P): boolean;
}

export abstract class AbstractMappedComponent implements MappedComponentProperties {
  @Input() isInEditor = false;
  @Input() cqPath = '';
  @Input() itemName = '';
}

/**
 * The current class extends the @adobe/cq-spa-component-mapping#Mapto library and features with Angular specifics such as
 *
 * - Storing the editing configurations for each resource type
 */
export class ComponentMappingWithConfig {
  /**
   * Store of EditConfig structures
   */
  private editConfigMap : { [key: string]: EditConfig<MappedComponentProperties>; } = {}

  constructor(private spaMapping:SPAComponentMapping) {}

  /**
   * Stores a component class for the given resource types and also allows to provide an EditConfig object
   * @param resourceTypes - List of resource types
   * @param clazz - Component class to be stored
   * @param [editConfig] - Edit configuration to be stored for the given resource types
   */
  map<P extends MappedComponentProperties>(resourceTypes: string | string[], clazz:Type<P>, editConfig:EditConfig<P> = null) : void {
      const innerClass = clazz;

          const resourceList = (typeof resourceTypes === 'string') ? [ resourceTypes ] : resourceTypes;

          resourceList.forEach((entry) => {
              if (editConfig) {
                  this.editConfigMap[entry] = editConfig;
              }
              this.spaMapping.map(entry, innerClass);
          });

    }

    /**
     * Stores a  component class for the given resource types and also allows to provide an EditConfig object in a Lazy Manner
     * @param resourceTypes - List of resource types
     * @param lazyPromiseCall a function that returns a promise to give back the designated type / class
     * @param [editConfig] - Edit configuration to be stored for the given resource types
     */
    lazyMap<P extends MappedComponentProperties>(resourceTypes: string | string[],
                                                 lazyPromiseCall: () => Promise<Type<P>>, editConfig:EditConfig<P> = null)
        : void {

        const innerClass = lazyPromiseCall;
        const resourceList = (typeof resourceTypes === 'string') ? [ resourceTypes ] : resourceTypes;

        resourceList.forEach((entry) => {
            if (editConfig) {
                this.editConfigMap[entry] = editConfig;
            }
            this.spaMapping.lazyMap(entry, innerClass);
        });

    }

  /**
   * Returns the component class for the given resourceType
   * @param resourceType - Resource type for which the component class has been stored
   */
  get(resourceType:string):Type<MappedComponentProperties> {
    return this.spaMapping.get(resourceType) as Type<MappedComponentProperties>;
  }

  /**
     * Returns the component class for the given resourceType
     * @param resourceType - Resource type for which the component class has been stored
     */
    lazyGet(resourceType: string): Promise<Type<MappedComponentProperties>> {
        return this.spaMapping.getLazy(resourceType) as Promise<Type<MappedComponentProperties>>;
    }

  /**
   * Returns the EditConfig structure for the given type
   * @param resourceType - Resource type for which the configuration has been stored
   */
  getEditConfig(resourceType:string):EditConfig<MappedComponentProperties> {
      return this.editConfigMap[resourceType];
  }
}

const componentMapping = new ComponentMappingWithConfig(SPAComponentMapping);

function MapTo <M extends MappedComponentProperties>(resourceTypes: string | string[]) {
    return (clazz:Type<M>, editConfig:EditConfig<M> = null): void => {
        return componentMapping.map(resourceTypes, clazz, editConfig);
    };
}

function LazyMapTo <M extends MappedComponentProperties>(resourceTypes: string | string[]) {
    return (clazz: ()=> Promise<Type<M>>, editConfig = null): void => {
        return componentMapping.lazyMap(resourceTypes, clazz, editConfig);
    };
}

export { componentMapping as ComponentMapping, MapTo, LazyMapTo };