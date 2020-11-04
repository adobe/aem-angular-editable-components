import {EditConfig, LazyMapTo, MappedComponentProperties, MapTo} from "./component-mapping";
import {TestProperties} from "./component-mapping.spec";

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {AEMComponentDirective} from './aem-component.directive';
import {AEMModelProviderComponent} from './aem-model-provider/aem-model-provider.component';
import {ModelManager} from '@adobe/aem-spa-page-model-manager';
import {Utils} from './utils';
import {AEMResponsiveGridComponent} from "./aem-responsivegrid/aem-responsivegrid.component";
import {AEMContainerComponent} from "./aem-container/aem-container.component";
import {
    AEMAllowedComponentsContainerComponent
} from "./aem-allowed-components-container/aem-allowed-components-container.component";
import {Component1} from '../test/test-comp1.component';
import LazyComponent from "../test/lazy-component-wrapper/lazy.component";

describe("Dynamic Component Mapping", () => {

    let component: AEMResponsiveGridComponent;
    let fixture: ComponentFixture<AEMResponsiveGridComponent>;

    let isInEditorSpy;

    const cqItems = {
        // 'test1': {
        //     ':type': 'adobe/component1',
        //     'cqType': 'adobe/component1',
        //     'some': 'test1'
        // },
        'test2': {
            ':type': 'adobe/component2',
            'cqType': 'adobe/component2',
            'title': 'test2',
            'angularDynamicComponent': 'LazyComponent',
            'some': 'Bla'
        }
    };
    const cqItemsOrder = ['test2'];

    beforeEach(() => {
        spyOn(ModelManager, 'addListener').and.returnValue(undefined);
        isInEditorSpy = spyOn(Utils, 'isInEditor').and.returnValue(false);

        TestBed.configureTestingModule({
            declarations: [AEMContainerComponent,
                AEMComponentDirective,
                AEMModelProviderComponent,
                Component1,
                AEMAllowedComponentsContainerComponent,
                AEMResponsiveGridComponent]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [AEMResponsiveGridComponent, Component1]
            }
        }).compileComponents();

        fixture = TestBed.createComponent(AEMResponsiveGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should map and show lazyComponents", () => {

        let editConfig1: EditConfig<TestProperties> = {isEmpty: (props) => !!props.some};

        isInEditorSpy.and.returnValue(true);
        component.cqItemsOrder = cqItemsOrder;
        component.cqItems = cqItems;


        //MapTo('adobe/component1')(Component1);

        const imported = () => import('../test/lazy-component-wrapper/lazy.entry');

        //@ts-ignore
        LazyMapTo("adobe/component2")(imported);




        //make sure the import is completed so it's immediately executed.

        fixture.detectChanges();

        console.log(fixture.nativeElement);

    });


});

