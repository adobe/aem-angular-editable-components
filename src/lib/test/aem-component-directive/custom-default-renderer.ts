import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'core-contentfragment-default-renderer-v1',
  template: '<div id="myCustomComponent">test</div>'
})
export class CustomDefaultRenderer implements OnInit{
  ngOnInit(): void {
    console.log('init?')
  }



}
