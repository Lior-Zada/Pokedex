import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundBarComponent } from './sound-bar.component';

describe('SoundBarComponent', () => {
  let component: SoundBarComponent;
  let fixture: ComponentFixture<SoundBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
