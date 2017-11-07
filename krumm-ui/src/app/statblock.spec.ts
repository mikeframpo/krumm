import { TestBed } from '@angular/core/testing';
import { StatblockComponent } from './statblock.component';
import { async } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { Creep } from './creep';
import { By } from '@angular/platform-browser';


describe('Statblock tests', () => {

  let fixture: ComponentFixture<StatblockComponent>;
  let comp: StatblockComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatblockComponent]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(StatblockComponent);
    comp = fixture.componentInstance;
    comp.creep = Creep.createNewEdit();
    fixture.detectChanges();
  });

  it('name should be present', () => {
    expect(comp.creep).toBeDefined();
    const elem: HTMLElement = fixture.debugElement.query(
                                By.css('.creep-name')).nativeElement;
    expect(elem.innerText).toBe('Creature');
  });

  it('size should be present', () => {
    const elem: HTMLElement = fixture.debugElement.query(
                                By.css('.creep-type')).nativeElement;
    expect(elem.innerText).toBeTruthy();
  });
});
