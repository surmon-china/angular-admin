// Imports
import {
  Component,
  Input,
  Output,
  ElementRef,
  ViewChild,
  Optional,
  EventEmitter,
  NgZone,
  forwardRef,
  Renderer,
  NgModule,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import 'wangeditor';
// require('wangeditor/dist/css/wangEditor.css');

/**
 * wangEditor component
 * Usage :
 *  <wang-editor [(ngModel)]="data" [config]="{...}" debounce="500"></wang-editor>
 */
@Component({
  selector: 'wang-editor',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => wangEditorComponent),
      multi: true
    }
  ],
  // styles: [require('wangeditor/dist/css/wangEditor.min.css')],
  template: `<textarea class="wang-editor" #host></textarea>`,
})
export class wangEditorComponent {

  @Input() config;
  @Input() debounce;

  @Output() change = new EventEmitter();
  @Output() ready = new EventEmitter();
  @ViewChild('host') host;

  _value = '';
  instance;
  debounceTimeout;
  zone;

  /**
   * Constructor
   */
  constructor(zone:NgZone){
    this.zone = zone;
  }

  get value(): any { return this._value; };
  @Input() set value(v) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  /**
   * On component destroy
   */
  ngOnDestroy(){
    if (this.instance) {
      setTimeout(() => {
        this.instance.destroy();
        this.instance = null;
      });
    }
  }

  /**
   * On component view init
   */
  ngAfterViewInit(){
    // Configuration
    this.wangEditorInit(this.config || {});
  }

  /**
   * Value update process
   */
  updateValue(value){
    this.zone.run(() => {
      this.value = value;
      this.onChange(value);
      this.onTouched();
      this.change.emit(value);
    });
  }

  /**
   * wangEditor init
  */
  wangEditorInit(config){
    if (!wangEditor) {
      console.error('Please include wangEditor in your page');
      return;
    }

    // wangEditor replace textarea
    this.instance = new wangEditor(this.host.nativeElement);

    this.instance.config = Object.assign(this.instance.config, this.config)

    // wangEditor change event
    this.instance.onchange = () => {
      this.onTouched();
      let value = this.instance.$txt.html();

      // Debounce update
      if (this.debounce) {
        if(this.debounceTimeout) clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
          this.updateValue(value);
          this.debounceTimeout = null;
        }, parseInt(this.debounce));

      // Live update
      }else{
        this.updateValue(value);
      }
    });

    // created editor
    this.instance.create()

    // Set initial value
    this.instance.$txt.html(this.value);

    // instanceReady event
    this.ready.emit();
  }

  /**
   * Implements ControlValueAccessor
   */
  writeValue(value){
    this._value = value;
    if (this.instance)
      this.instance.$txt.html(value);
  }
  onChange(_){}
  onTouched() {}
  registerOnChange(fn){this.onChange = fn;}
  registerOnTouched(fn) { this.onTouched = fn; }
}
