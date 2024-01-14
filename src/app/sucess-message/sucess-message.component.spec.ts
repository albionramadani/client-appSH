import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessMessageComponent } from './sucess-message.component';

describe('SucessMessageComponent', () => {
  let component: SucessMessageComponent;
  let fixture: ComponentFixture<SucessMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SucessMessageComponent]
    });
    fixture = TestBed.createComponent(SucessMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
