import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexClientsComponent } from './index-clients.component';

describe('IndexClientsComponent', () => {
  let component: IndexClientsComponent;
  let fixture: ComponentFixture<IndexClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
