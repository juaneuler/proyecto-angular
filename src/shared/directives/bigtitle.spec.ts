import { Bigtitle } from './bigtitle';
import { ElementRef, Renderer2 } from '@angular/core';

describe('Bigtitle', () => {
  let mockElementRef: ElementRef;
  let mockRenderer2: jasmine.SpyObj<Renderer2>;
  let directive: Bigtitle;

  beforeEach(() => {
    mockElementRef = { nativeElement: document.createElement('div') } as ElementRef;
    mockRenderer2 = jasmine.createSpyObj('Renderer2', ['setStyle']);
    
    directive = new Bigtitle(mockElementRef, mockRenderer2);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
  
  it('should set font size to 20px on initialization', () => {
    directive.ngOnInit();
    
    expect(mockRenderer2.setStyle).toHaveBeenCalledWith(
      mockElementRef.nativeElement,
      'font-size',
      '20px'
    );
  });
  
  it('should call renderer exactly once during initialization', () => {
    directive.ngOnInit();
    
    expect(mockRenderer2.setStyle).toHaveBeenCalledTimes(1);
  });
});