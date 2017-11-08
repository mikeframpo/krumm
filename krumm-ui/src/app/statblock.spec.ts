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

  it('challengeratings', () => {

    comp.creep.cr_num = 1;
    comp.creep.cr_den = 4;
    expect(comp.creep.challengeRating).toBe('1/4');

    fixture.detectChanges();
    let elem: HTMLElement = fixture.debugElement.query(By.css('#challenge')).nativeElement;
    expect(elem.innerText).toBe('Challenge 1/4');

    comp.creep.cr_num = 10;
    comp.creep.cr_den = 1;
    expect(comp.creep.challengeRating).toBe('10');

    comp.creep.cr_num = null;
    comp.creep.cr_den = null;
    fixture.detectChanges();
    elem = fixture.debugElement.query(By.css('#challenge')).nativeElement;
    expect(elem.innerText).toBe('Challenge -');
  });
});
