---
title: Jest
created: 2026-01-01T23:28:00
category: Test
tags: [Fiche]
---

## Introduction à Jest

Jest est un framework de test JavaScript créé par Facebook, largement utilisé pour tester des applications Angular. Il est apprécier pour sa simplicité, sa rapidité et ses fonctionnalités puissantes comme la couverture de code intégrée et les mocks faciles à configurer.

## Configuration de Jest avec Angular

Pour utiliser Jest avec Angular, vous devez d'abord l'installer et le configurer dans votre projet Angular.

### Installation

```bash
npm install --save-dev jest jest-preset-angular
```

### **Configuration**

Mettez à jour votre fichier **`angular.json`** pour utiliser Jest comme test runner et ajoutez un fichier de configuration **`jest.config.js`**.

## **Tests de Composants avec Jest**

Les tests de composants dans Angular avec Jest permettent de vérifier que vos composants se comportent comme prévu.

### **Exemple de test de composant**

```tsx
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MyComponent } from './my.component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
```

## **Tests HTTP avec Jest**

Pour tester les requêtes HTTP, vous pouvez utiliser **`HttpClientTestingModule`** pour simuler les requêtes HTTP.

### **Exemple de test HTTP**

```tsx
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MyService } from './my.service';

describe('MyService', () => {
  let service: MyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MyService]
    });

    service = TestBed.inject(MyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch data', () => {
    const mockData = { name: 'Test' };

    service.getData().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('api/data');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
```

## **Utilisation de `spyOn`**

**`spyOn`** est une fonction de Jest qui permet de surveiller les appels à une fonction et de définir des comportements simulés.

### **Exemple d'utilisation de `spyOn`**

```tsx
import { MyService } from './my.service';

describe('MyService', () => {
  let service: MyService;

  beforeEach(() => {
    service = new MyService();
  });

  it('should call a method', () => {
    const spy = jest.spyOn(service, 'myMethod');

    service.myMethod();

    expect(spy).toHaveBeenCalled();
  });

  it('should mock a method return', () => {
    jest.spyOn(service, 'myMethod').mockReturnValue('Mocked Value');

    const result = service.myMethod();

    expect(result).toBe('Mocked Value');
  });
});
```

## **Conclusion**

Jest est un outil puissant pour tester les applications Angular. Il permet de tester facilement les composants, les services HTTP et d'utiliser des espions pour surveiller et simuler les comportements des fonctions. En intégrant Jest dans votre projet Angular, vous pouvez améliorer la qualité et la fiabilité de votre code.