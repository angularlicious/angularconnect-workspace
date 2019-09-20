import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthProviderDialogComponent } from './auth-provider-dialog.component';

describe('AuthProviderDialogComponentComponent', () => {
  let component: AuthProviderDialogComponentComponent;
  let fixture: ComponentFixture<AuthProviderDialogComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthProviderDialogComponentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthProviderDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
