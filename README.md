# Ecommerce Storefront (Angular 19)

A small ecommerce storefront originally built as a learning exercise in Angular 2/4, now modernized to **Angular 19** with standalone components, signals, and the Angular CLI.

## What this project is for

This repo is a sandbox for practicing frontend fundamentals through a familiar online shop:

- Standalone components
- Routing (`/category`, `/product/:id`, `/cart`)
- Dependency injection with `inject()`
- Reactive cart state with **signals** and computed values
- Lazy-loaded routes
- SCSS component styling

## Requirements

- Node.js 18+ (Node 20+ recommended)
- npm 9+

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:4200/category](http://localhost:4200/category).

## Build

```bash
npm run build
```

Production output is written to `dist/ecommerce-storefront-ng2`.

## Test

```bash
npm test
```

## App flow

1. Browse products on `/category`
2. Open product details on `/product/:id`
3. Add items to the in-memory cart
4. Review items in the header popup cart or full `/cart` page

Products are still mock data in `src/app/services/products.ts` — there is no backend, payment flow, or authentication.

## Modernization notes

Compared with the original Angular 2/4 version:

| Before | After |
|---|---|
| NgModule bootstrap | Standalone `bootstrapApplication` |
| Gulp + Webpack | Angular CLI |
| RxJS `Subject` cart updates | Signal-based `CartService` |
| `*ngFor` / `*ngIf` | `@for` / `@if` control flow |
| `require()` templates | `templateUrl` / `styleUrl` |
| `src/assets` | `public/assets` |

## Original credits

The first version was scaffolded with the [Yeoman Fountain Angular2 generator](https://www.npmjs.com/package/generator-fountain-angular2).
