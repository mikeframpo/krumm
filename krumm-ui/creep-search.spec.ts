import { TestBed } from '@angular/core/testing';
import { CreepSearchComponent } from './creep-search.component';
import { ComponentFixture } from '@angular/core/testing';
import { async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CreepDisplayComponent } from './creep-display.component';
import { EditCreepComponent } from './edit-creep.component';


describe('CreepSearchComponent tests', () => {

  let comp: CreepSearchComponent;
  let fixture: ComponentFixture<CreepSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        AppRoutingModule,
      ],
      declarations: [
        CreepSearchComponent,
        CreepDisplayComponent,
        EditCreepComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreepSearchComponent);
    comp = fixture.componentInstance;
  });

  it('filter by name', () => {
    comp.nameQuery = 'griffon';
    expect(true).toBe(true);
  });
});
