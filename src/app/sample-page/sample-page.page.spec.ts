import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SamplePagePage } from './sample-page.page';

describe('SamplePagePage', () => {
  let component: SamplePagePage;
  let fixture: ComponentFixture<SamplePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplePagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SamplePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
