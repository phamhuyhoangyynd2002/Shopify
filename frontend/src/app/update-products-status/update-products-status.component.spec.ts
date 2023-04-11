import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductsStatusComponent } from './update-products-status.component';

describe('UpdateProductsStatusComponent', () => {
  let component: UpdateProductsStatusComponent;
  let fixture: ComponentFixture<UpdateProductsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProductsStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProductsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
