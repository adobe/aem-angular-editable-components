import {AEMComponentDirective} from "../../layout/aem-component.directive";
import {Directive, Type} from "@angular/core";
import {ComponentMappingProvider} from "../../layout/component-mapping";
import {CustomDefaultRenderer} from "./custom-default-renderer";
import {ComponentMapping} from "@adobe/aem-spa-component-mapping";

@Directive({
  selector: '[CustomDirective]'
})
export class CustomDirective extends AEMComponentDirective {

  getFallbackComponent():Type<unknown> | null{
    return CustomDefaultRenderer;
  }

  getType(): string | undefined {
    return this.cqItem && this.cqItem[":customType"];
  }

}
