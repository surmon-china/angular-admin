import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[href]',
  host: {
    '(click)' : 'preventDefault($event)'
  }
})
class hrefLinkPrevent {
  @Input() href;
  preventDefault(event) {
    // if(!this.href.length)
    event.preventDefault();
  }
}
