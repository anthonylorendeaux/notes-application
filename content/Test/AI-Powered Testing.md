---
title: AI-Powered Testing
category: Test
tags: Fiche
created: 2026-03-24
---

L'**AI-Powered Testing** consiste à utiliser des LLMs (Claude, GPT-4, etc.) pour générer, améliorer et automatiser les tests d'une application. L'IA ne remplace pas le jugement du développeur, mais **accélère massivement** la couverture de tests et la détection de cas limites.

---

## 1. Générer des tests unitaires avec Claude

### Prompt de base — générer des tests Jest

La méthode la plus simple : donner le fichier source à Claude et lui demander les tests.

```
Voici mon service Angular :
[coller le contenu du fichier]

Génère des tests Jest complets pour ce service :
- Cas nominaux
- Cas d'erreur
- Edge cases
- Mock des dépendances injectées
```

### Exemple — tester un service Angular

**Source : `user.service.ts`**

```tsx
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`/api/users/${user.id}`, user);
  }
}
```

**Tests générés par Claude : `user.service.spec.ts`**

```tsx
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  describe('getUser', () => {
    it('should fetch user by id', () => {
      const mockUser: User = { id: 1, name: 'Alice' };
      service.getUser(1).subscribe(user => expect(user).toEqual(mockUser));
      const req = httpMock.expectOne('/api/users/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });

    it('should handle 404 error', () => {
      service.getUser(999).subscribe({
        error: err => expect(err.status).toBe(404)
      });
      httpMock.expectOne('/api/users/999').flush('Not found', {
        status: 404, statusText: 'Not Found'
      });
    });
  });

  describe('updateUser', () => {
    it('should send PUT request with user data', () => {
      const mockUser: User = { id: 1, name: 'Bob' };
      service.updateUser(mockUser).subscribe();
      const req = httpMock.expectOne('/api/users/1');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockUser);
      req.flush(mockUser);
    });
  });
});
```

---

## 2. Générer des tests avec Claude Code

Dans le terminal, directement dans ton projet :

```bash
claude
```

```
> Analyse tous les services dans src/app/services/
  et génère les fichiers .spec.ts manquants.
  Utilise HttpTestingController pour les appels HTTP
  et assure une couverture minimum de 80%.
```

Claude Code va :

1. Scanner tous les fichiers `.service.ts`
2. Détecter lesquels n'ont pas de `.spec.ts`
3. Générer les fichiers de tests manquants
4. Lancer `npm run test` pour vérifier que tout passe

---

## 3. Revue de code automatisée

### Prompt de revue

```
Review ce composant Angular en tant que senior dev :
- Problèmes de performance (subscriptions non unsubscribed, etc.)
- Mauvaises pratiques Angular
- Code mort ou inutile
- Manque de gestion d'erreurs
- Suggestions de refactoring

[coller le fichier]
```

### Exemple de retour Claude

```
🔴 Critique
- Ligne 23 : subscription non détruite → memory leak
  Ajoute takeUntilDestroyed() ou unsubscribe dans ngOnDestroy

🟡 Warning  
- Ligne 45 : any TypeScript détecté → typer explicitement
- Ligne 67 : console.log oublié en production

🟢 Suggestion
- La méthode loadData() fait trop de choses → extraire en sous-méthodes
- Utiliser le pipe async au lieu de subscribe manuel dans le template
```

---

## 4. Détecter les edge cases oubliés

L'IA excelle pour trouver les cas que le dev n'a pas pensé à tester.

### Prompt

```
Voici ma fonction et ses tests actuels.
Quels edge cases importants sont manquants ?

Fonction :
[code]

Tests existants :
[tests]
```

### Exemple — fonction de calcul de prix

```tsx
// Fonction
function calculateDiscount(price: number, code: string): number {
  if (code === 'PROMO10') return price * 0.9;
  if (code === 'PROMO20') return price * 0.8;
  return price;
}
```

Claude va suggérer les edge cases manquants :

```
Edge cases manquants :
- price = 0 → retourne 0, est-ce voulu ?
- price négatif → comportement non défini
- code en minuscules 'promo10' → ne matche pas (case sensitive ?)
- code null ou undefined → crash potentiel
- price = NaN → résultat NaN non géré
- price = Infinity → cas limite à valider
```

---

## 5. Générer des tests E2E (Cypress / Playwright)

### Prompt Cypress

```
Génère un test Cypress pour ce scénario :
- L'utilisateur va sur /login
- Remplit email + mot de passe
- Clique sur "Se connecter"
- Est redirigé vers /dashboard
- Voit son nom affiché dans le header
```

### Test Cypress généré

```tsx
describe('Login Flow', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: { token: 'fake-jwt', user: { name: 'Alice' } }
    }).as('loginRequest');
  });

  it('should login and redirect to dashboard', () => {
    cy.visit('/login');
    cy.get('[data-cy=email]').type('alice@example.com');
    cy.get('[data-cy=password]').type('password123');
    cy.get('[data-cy=submit]').click();
    cy.wait('@loginRequest');
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy=user-name]').should('contain', 'Alice');
  });

  it('should show error on invalid credentials', () => {
    cy.intercept('POST', '/api/auth/login', { statusCode: 401 });
    cy.visit('/login');
    cy.get('[data-cy=email]').type('wrong@email.com');
    cy.get('[data-cy=password]').type('wrongpass');
    cy.get('[data-cy=submit]').click();
    cy.get('[data-cy=error-message]').should('be.visible');
  });
});
```

---

## 6. Skill CLAUDE.md — tests automatiques

Ajouter dans ton `CLAUDE.md` pour que Claude génère toujours des tests :

```markdown
## Skills
- Nouveau service → @docs/skills/test-service.md
- Nouveau composant → @docs/skills/test-component.md

## Testing Rules
- Tout nouveau fichier .ts doit avoir son .spec.ts
- Couverture minimum : 80% par fichier
- Toujours mocker les dépendances externes (HTTP, stores)
- Nommer les tests : "should [action] when [contexte]"
```

**`docs/skills/test-service.md`**

```markdown
# Skill : Tester un service Angular

1. Créer le fichier .spec.ts dans le même dossier
2. Configurer TestBed avec HttpClientTestingModule si HTTP
3. Tester chaque méthode publique
4. Couvrir : cas nominal, erreur 4xx, erreur 5xx, input vide/null
5. Vérifier qu'il n'y a pas de requêtes HTTP non consommées (httpMock.verify())
6. Lancer `npm run test -- --coverage` et vérifier > 80%
```

---

## 7. Workflow complet AI Testing

```bash
# 1. Lancer Claude Code
claude

# 2. Audit de la couverture actuelle
> Lance npm run test:coverage et dis-moi
  quels fichiers ont moins de 80% de couverture

# 3. Génération des tests manquants
> Génère les tests pour les 3 fichiers
  les moins couverts identifiés

# 4. Vérification
> Relance les tests et confirme
  que la couverture globale a augmenté

# 5. Revue qualité
> Relis les tests générés et signale
  tout test qui ne teste rien de réel (faux positif)
```

---

## Bonnes pratiques

- **Toujours relire** les tests générés — l'IA peut produire des tests qui passent sans rien valider
- **Ajouter `data-cy`** sur les éléments HTML clés pour faciliter les tests E2E
- **Nommer explicitement** : `should return null when user not found` > `test getUserById`
- **Ne pas faire confiance** au coverage seul — 100% de coverage ≠ 100% des bugs couverts
- **Utiliser l'IA pour les edge cases** : c'est là qu'elle apporte le plus de valeur

---

## Résumé

| Use case | Outil recommandé | Gain de temps |
| --- | --- | --- |
| Générer tests unitaires | Claude Code / prompt direct | ×5 |
| Trouver edge cases oubliés | Prompt Claude | ×3 |
| Revue de code | Prompt Claude | ×2 |
| Générer tests E2E | Claude Code | ×4 |
| Audit couverture + fix | Claude Code autonome | ×6 |
