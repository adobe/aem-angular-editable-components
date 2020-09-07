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

import { ComponentMapping, MapTo, MappedComponentProperties, EditConfig, AbstractMappedComponent } from "./component-mapping";
import { Component, Input } from '@angular/core';


interface TestProperties extends MappedComponentProperties{
   some: string;
}

class ComponentTest1 extends AbstractMappedComponent{
  @Input() some:string = "defaultValue";
}
class ComponentTest2 extends AbstractMappedComponent{
  @Input() some:string = "otherDefaultValue";
}


describe("Component Mapping", () => {

  it("stores configuration", () => {

    let editConfig1:EditConfig<TestProperties> = { isEmpty: (props) => !!props.some };
    let editConfig2:EditConfig<TestProperties> = { isEmpty: (props) => !!props.some  };

    MapTo<TestProperties>("component1")(ComponentTest1, editConfig1);
    MapTo<TestProperties>("component2")(ComponentTest2, editConfig2);

    expect(ComponentMapping.get("component1")).toBe(ComponentTest1);
    expect(ComponentMapping.get("component2")).toBe(ComponentTest2);
    expect(ComponentMapping.getEditConfig("component1")).toBe(editConfig1);
    expect(ComponentMapping.getEditConfig("component2")).toBe(editConfig2);

  });
});
