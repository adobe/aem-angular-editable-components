import {EditConfig, LazyMapTo, MappedComponentProperties, MapTo} from "./component-mapping";
import {ComponentMapping as SPAComponentMapping} from '@adobe/aem-spa-component-mapping';
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
import {Test1Component} from '../test/test-comp1.component';
import LazyComponent from "../test/lazy-component-wrapper/lazy.component";

describe("Dynamic Component Mapping", () => {

    let component: AEMResponsiveGridComponent;
    let fixture: ComponentFixture<AEMResponsiveGridComponent>;

    let isInEditorSpy;

    const cqItems = {
        'test1': {
            ':type': 'adobe/component1',
            'cqType': 'adobe/component1',
            'some': 'test1'
        },
        'test2': {
            ':type': 'adobe/component2',
            'cqType': 'adobe/component2',
            'title': 'test2',
            'angularDynamicComponent': 'LazyComponent',
            'some': 'Feike'
        }
    };
    const cqItemsOrder = ['test1','test2'];

    beforeEach(() => {
        spyOn(ModelManager, 'addListener').and.returnValue(undefined);
        isInEditorSpy = spyOn(Utils, 'isInEditor').and.returnValue(false);

        TestBed.configureTestingModule({
            declarations: [AEMContainerComponent,
                AEMComponentDirective,
                AEMModelProviderComponent,
                Test1Component,
                LazyComponent,
                AEMAllowedComponentsContainerComponent,
                AEMResponsiveGridComponent]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [AEMResponsiveGridComponent, Test1Component, LazyComponent]
            }
        }).compileComponents();

        fixture = TestBed.createComponent(AEMResponsiveGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should map and show lazyComponents", async () => {

        let editConfig1: EditConfig<TestProperties> = {emptyLabel: 'CustomText', isEmpty: (props) => !!props.some};

        isInEditorSpy.and.returnValue(true);
        component.cqItemsOrder = cqItemsOrder;
        component.cqItems = cqItems;

        const imported = () => new Promise<any>((resolve, reject) => {
            import('../test/lazy-component-wrapper/lazy.entry').then((Module) => {
                resolve(Module.LazyComponent);
            }).catch(reject);
        });

        MapTo<MappedComponentProperties>("adobe/component1")(Test1Component);
        LazyMapTo<TestProperties>("adobe/component2")(imported,editConfig1);

        const mappedComponentPromise = SPAComponentMapping.getLazy("adobe/component2");
        let resolved = false;
        if(!!mappedComponentPromise){
            await mappedComponentPromise.then((Component) => {
                expect(Component).toBe(LazyComponent);
                resolved = true;
            }).catch(fail);
        }else{
            fail("No mapped promise found!");
        }

        expect(resolved).toBeTrue();

        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('test-comp1')).toBeDefined();
        expect(fixture.nativeElement.querySelector('lazy-comp')).toBeDefined();
        expect(fixture.nativeElement.querySelector('lazy-comp.cq-placeholder[data-emptytext="CustomText"] div').innerText).toEqual('Feike');



    });


});

