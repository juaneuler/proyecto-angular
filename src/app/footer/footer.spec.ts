import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';
import { By } from '@angular/platform-browser';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the copyright text', () => {
    const footerElement = fixture.debugElement.query(By.css('footer'));
    expect(footerElement).toBeTruthy();
    expect(footerElement.nativeElement.textContent).toContain('JUAN EULER');
  });

  it('should have the correct CSS class', () => {
    const footerElement = fixture.debugElement.query(By.css('.footer'));
    expect(footerElement).toBeTruthy();
  });
});