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

import {
  AfterViewInit,
  ChangeDetectorRef,
  Compiler,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  Type,
  ViewContainerRef
} from '@angular/core';

import { ComponentMapping, MappedComponentProperties } from './component-mapping';
import { Constants } from './constants';
import { Utils } from './utils';

/**
 * @private
 */
const PLACEHOLDER_CLASS_NAME = 'cq-placeholder';

@Directive({
  selector: '[aemComponent]'
})
/**
 * The current directive provides advanced capabilities among which are
 *
 * - The management of the component placeholder in the Page Editor
 * - The dynamic instantiation of components based on a component definition
 * - The conversion from model fields to properties and injection in the component instance
 * - The management of HTMLElement attributes and class names on the native element
 */
export class AEMComponentDirective implements AfterViewInit, OnInit, OnDestroy, OnChanges {

  /**
   * Dynamically created component
   */
  private _component: ComponentRef<MappedComponentProperties>;
  /**
   * Model item that corresponds to the current component
   */
  private _cqItem: any;

  get cqItem(): any {
    return this._cqItem;
  }

  @Input()
  set cqItem(value: any) {
    this._cqItem = value;
  }

  get changeDetectorRef(): ChangeDetectorRef {
    return this._changeDetectorRef;
  }

  /**
   * Path to the model structure associated with the current component
   */
  @Input() cqPath: string;

  /**
   * Name of the current instance of the component
   */
  @Input() itemName: string;

  /**
   * HtmlElement attributes for the current instance of the component
   */
  @Input() itemAttrs: any;

  @Input() loaded: boolean;

  @Input() aemComponent;

  constructor(
    private renderer: Renderer2,
    private viewContainer: ViewContainerRef,
    private compiler: Compiler,
    private injector: Injector,
    private factoryResolver: ComponentFactoryResolver,
    private _changeDetectorRef: ChangeDetectorRef) {
  }

  async ngOnInit() {

    if (this.type) {
     const mappedFn:Type<MappedComponentProperties> = ComponentMapping.get<MappedComponentProperties>(this.type);
 
     if (mappedFn) {
      this.renderComponent(mappedFn);
     } else {
      await this.initializeAsync();
     }
    } else {
     console.warn('no type on ' + this.cqPath);
    }
 
   }

  async initializeAsync() {
   const lazyMappedPromise: Promise<Type<MappedComponentProperties>> = ComponentMapping.lazyGet<MappedComponentProperties>(this.type);

   try {
     const LazyResolvedComponent = await lazyMappedPromise;

     this.renderComponent(LazyResolvedComponent);
     this.loaded = true;
     this._changeDetectorRef.detectChanges();
   } catch (err) {
     console.warn(err);
   }
  }

  ngOnChanges(): void {
    this.updateComponentData();
  }

  /**
   * Returns the type of the cqItem if exists.
   */
  get type(): string | undefined {
    return this.cqItem && this.cqItem[Constants.TYPE_PROP];
  }

  /**
   * Renders a component dynamically based on the component definition
   *
   * @param componentDefinition The component definition to render
   */
  private renderComponent(componentDefinition: Type<MappedComponentProperties>) {
    if (componentDefinition) {
      const factory = this.factoryResolver.resolveComponentFactory(componentDefinition);

      this.renderWithFactory(factory);
    } else {
      throw new Error('No component definition!!');
    }
  }

  private renderWithFactory(factory: ComponentFactory<any>) {
    this.viewContainer.clear();
    this._component = this.viewContainer.createComponent(factory);
    this.updateComponentData();
  }

  /**
   * Updates the data of the component based the data of the directive
   */
  private updateComponentData() {
    if (!this._component || !this._component.instance || !this.cqItem) {
      return;
    }

    const keys = Object.getOwnPropertyNames(this.cqItem);

    keys.forEach((key) => {
      let propKey = key;

      if (propKey.startsWith(':')) {
        // Transformation of internal properties namespaced with [:] to [cq]
        // :myProperty => cqMyProperty
        const tempKey = propKey.substr(1);

        propKey = 'cq' + tempKey.substr(0, 1).toUpperCase() + tempKey.substr(1);
      }

      this._component.instance[propKey] = this.cqItem[key];
    });

    this._component.instance.cqPath = this.cqPath;
    this._component.instance.itemName = this.itemName || (this.cqItem && this.cqItem.id);
    this.includeAppliedCSSClasses();

    const editConfig = ComponentMapping.getEditConfig(this.type);

    if (editConfig && Utils.isInEditor) {
      this.setupPlaceholder(editConfig);
    }

    this._changeDetectorRef.detectChanges();
  }

  /**
   * Adds the applied css class names in to the element
   */
  private includeAppliedCSSClasses() {
    const appliedCssClassNames = this.cqItem[Constants.APPLIED_CLASS_NAMES] || '';

    if (appliedCssClassNames && this._component) {
      this.renderer.setAttribute(this._component.location.nativeElement, 'class', appliedCssClassNames);
    }
  }

  /**
   * Adds the specified item attributes to the element
   */
  private setupItemAttrs() {
    if (this.itemAttrs) {
      const keys = Object.getOwnPropertyNames(this.itemAttrs);

      keys.forEach((key) => {
        if (key === 'class') {
          const classes = this.itemAttrs[key].split(' ');

          classes.forEach((itemClass) => {
            this.renderer.addClass(this._component.location.nativeElement, itemClass);
          });
        } else {
          this.renderer.setAttribute(this._component.location.nativeElement, key, this.itemAttrs[key]);
        }
      });
    }
  }

  /**
   * Determines if the placeholder should e displayed.
   *
   * @param editConfig - the edit config of the directive
   */
  private usePlaceholder(editConfig) {
    return editConfig.isEmpty && typeof editConfig.isEmpty === 'function' && editConfig.isEmpty(this.cqItem);
  }

  /**
   * Setups the placeholder of needed for the AEM editor
   *
   * @param editConfig - the editConfig, which will dictate the classes to be added on.
   */
  private setupPlaceholder(editConfig) {
    if (this.usePlaceholder(editConfig)) {
      this.renderer.addClass(this._component.location.nativeElement, PLACEHOLDER_CLASS_NAME);
      this.renderer.setAttribute(this._component.location.nativeElement, 'data-emptytext', editConfig.emptyLabel);
    } else {
      this.renderer.removeClass(this._component.location.nativeElement, PLACEHOLDER_CLASS_NAME);
      this.renderer.removeAttribute(this._component.location.nativeElement, 'data-emptytext');
    }
  }

  ngAfterViewInit(): void {
    this.setupItemAttrs();
  }

  ngOnDestroy(): void {
    if (this._component) {
      this._component.destroy();
    }
  }
}
