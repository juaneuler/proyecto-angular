import { Bigtitle } from './bigtitle';
import { ElementRef, Renderer2 } from '@angular/core';

describe('Bigtitle', () => {
  let mockElementRef: ElementRef;
  let mockRenderer2: Renderer2;

  beforeEach(() => {
    mockElementRef = { nativeElement: document.createElement('div') } as ElementRef;
    mockRenderer2 = jasmine.createSpyObj('Renderer2', ['setStyle']);
  });

  it('should create an instance', () => {
    const directive = new Bigtitle(mockElementRef, mockRenderer2);
    expect(directive).toBeTruthy();
  });
});