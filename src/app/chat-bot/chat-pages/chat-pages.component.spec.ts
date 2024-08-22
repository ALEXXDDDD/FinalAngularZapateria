import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPagesComponent } from './chat-pages.component';

describe('ChatPagesComponent', () => {
  let component: ChatPagesComponent;
  let fixture: ComponentFixture<ChatPagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatPagesComponent]
    });
    fixture = TestBed.createComponent(ChatPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
