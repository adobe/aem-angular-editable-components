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

import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ModelManager, PathUtils } from '@adobe/aem-spa-page-model-manager';
import { AEMComponentDirective } from '../aem-component.directive';
import { Constants } from '../constants';
import { Utils } from '../utils';

@Component({
  selector: 'aem-model-provider,[aemModelProvider]',
  template: `<ng-container *ngIf="cqItemLoaded | async" aemComponent [cqItem]='cqItem' [cqPath]='cqPath' [itemName]='itemName'></ng-container>`
})
/**
 * The current component is responsible for providing access to the ModelManager and the model of a component
 */
export class AEMModelProviderComponent {
  /**
   * Path to the model associated with the current instance of the component
   */
  @Input() cqPath;
  /**
   * Model item associated with the current model provider component
   */
  @Input() cqItem;
  /**
   * Name of the item associated with the current model provider component
   */
  @Input() itemName;

  @Input() aemModelProvider;

  @Input() pagePath;

  @Input() itemPath;

  @Output() updateDataPath = new EventEmitter();

  cqItemLoaded: Promise<boolean>;

  @ViewChild(AEMComponentDirective) aemComponent: AEMComponentDirective;

  constructor() { /* void */ }

  /**
   * Updates the item data
   */
  updateItem(): void {
    ModelManager.getData({ path: this.cqPath }).then(model => {
      this.cqItemLoaded = Promise.resolve(true);
      this.cqItem = model;
      if (this.pagePath && Utils.isInEditor()) {
        PathUtils.dispatchGlobalCustomEvent(Constants.ASYNC_CONTENT_LOADED_EVENT, {});
      }
      if (this.aemComponent) {
        this.aemComponent.changeDetectorRef.markForCheck();
      }
    });
  }

  async ngOnInit(): Promise<void> {
    await ModelManager.initialize();
    if (!this.cqItem && this.pagePath) {
      this.cqPath = Utils.getCQPath(this.pagePath, this.itemPath);
      this.updateDataPath.emit({ cqPath: this.cqPath });
      this.updateItem();
    } else {
      this.cqItemLoaded = Promise.resolve(true);
    }
    ModelManager.addListener(this.cqPath, this.updateItem.bind(this));
  }

  ngDestroy(): void {
    ModelManager.removeListener(this.cqPath, this.updateItem.bind(this));
  }
}
