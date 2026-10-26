# Playwright API Mocking — Key Concepts & Troubleshooting Guide

This guide summarizes core concepts, patterns, and common pitfalls encountered when mocking and intercepting API responses in Playwright tests with TypeScript.

---

## 1. Core API Mocking Concepts in Playwright

Playwright provides `page.route()` to intercept and handle HTTP/HTTPS network requests before they reach or leave the browser.

### A. Full Replacement Mock (`route.fulfill`)
Replaces the API endpoint completely with mock data without contacting the backend server.

```typescript
await page.route('*/**/api/v1/fruits', async (route) => {
    if (route.request().method().toUpperCase() === 'GET') {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            json: [
                { id: 1, name: 'mocked fruit 1' },
                { id: 2, name: 'mocked fruit 2' }
            ]
        });
    } else {
        await route.continue();
    }
});
```

---

### B. Intercept & Modify Real API Responses (`route.fetch` + `route.fulfill`)
Fetches the real API response from the server, modifies the response body (e.g., appends a new item), and returns the modified response to the frontend.

```typescript
await page.route('*/**/api/v1/fruits', async (route) => {
    if (route.request().method().toUpperCase() === 'GET') {
        // 1. Fetch real API response
        const response = await route.fetch();
        const responseBody = await response.json();

        // 2. Modify response body
        responseBody.push({ id: 99, name: 'Newly Added Fruit' });

        // 3. Fulfill with modified payload while preserving original response headers & status
        await route.fulfill({ response, json: responseBody });
    } else {
        await route.continue();
    }
});
```

---

## 2. Helper Class Architecture: `MockAPIClient`

Encapsulating mock logic into a reusable client keeps test specs clean and maintainable.

```typescript
import { Page } from '@playwright/test';

export class MockAPIClient {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Completely overrides the response with provided data.
     */
    async changeOutputResponse(method: string, urlPattern: string, data: any) {
        await this.page.route(urlPattern, async (route) => {
            if (route.request().method().toUpperCase() === method.toUpperCase()) {
                await route.fulfill({ json: data });
            } else {
                await route.continue();
            }
        });
    }

    /**
     * Fetches the real response and appends new data to it.
     */
    async modifyOutputResponse(method: string, urlPattern: string, data: Record<string, any>) {
        await this.page.route(urlPattern, async (route) => {
            if (route.request().method().toUpperCase() === method.toUpperCase()) {
                const response = await route.fetch();
                const responseBody = await response.json();

                // Append the single object
                responseBody.push(data);

                await route.fulfill({ response, json: responseBody });
            } else {
                await route.continue();
            }
        });
    }
}
```

---

## 3. Important Pitfalls & How to Avoid Them

### ❌ Pitfall 1: Premature Test Termination (`route.fetch: Test ended`)

**Symptom:**
```
Error: route.fetch: Test ended.
Call log:
  - operation was aborted: Test ended.
```

**Cause:**
`page.goto()` resolves as soon as the initial HTML document loads. The browser then triggers background `fetch()` requests asynchronously. If the test has no assertion waiting for UI updates, Playwright finishes the test and destroys the browser context while `await route.fetch()` is still running.

**Fix:**
Always include an assertion (such as `expect(locator).toBeVisible()`) to keep the test alive until the mocked data renders on screen:

```typescript
test('push new data', async ({ page }) => {
    const mock = new MockAPIClient(page);
    await mock.modifyOutputResponse('get', '*/**/api/v1/fruits', { id: 1, name: 'mocked fruit 1' });

    await page.goto('https://demo.playwright.dev/api-mocking/');

    // ✅ Keeps test alive until data renders
    await expect(page.getByText('mocked fruit 1')).toBeVisible();
});
```

---

### ❌ Pitfall 2: TypeScript Parameter Types (`object[]` vs `Record<string, any>`)

**Symptom:**
```
[ts] Object literal may only specify known properties, and 'id' does not exist in type 'object[]'. (2353)
```

**Cause:**
If the function parameter is typed as `data: object[]` (an array of objects), passing a single object literal `{ id: 1, name: 'fruit' }` causes TypeScript to check the object literal against the properties of an Array (`length`, `push`, etc.), which has no `id` property.

**Fix:**
- If you intend to pass a **single object**, use `data: Record<string, any>` or `data: any`.
- If you intend to pass an **array of objects**, use `data: Record<string, any>[]` and pass `[{ id: 1, name: 'fruit' }]`.

---

### ❌ Pitfall 3: Spread Operator (`...`) on Non-Iterable Objects

**Symptom:**
```
TypeError: Spread syntax requires ...iterable[Symbol.iterator] to be a function
```

**Cause:**
In JavaScript, spreading inside function arguments (`fn(...obj)`) requires an iterable (like an Array). Plain object literals `{}` do not have `[Symbol.iterator]`.

```typescript
// ❌ FAILS at runtime if data is an object literal
responseBody.push(...data);

// ✅ Correct for a single object literal
responseBody.push(data);

// ✅ Correct if handling both single objects and arrays
if (Array.isArray(data)) {
    responseBody.push(...data);
} else {
    responseBody.push(data);
}
```

---

### ❌ Pitfall 4: Missing `await` on Async Route Operations

**Symptom:**
Inconsistent test failures, unhandled promise rejections, or hanging tests.

**Cause:**
`route.fetch()` and `route.fulfill()` are asynchronous methods returning Promises. Forgetting to `await` them causes race conditions.

```typescript
// ❌ WRONG
route.fulfill({ response, json: responseBody });

// ✅ CORRECT
await route.fulfill({ response, json: responseBody });
```

---

## 4. Summary Checklist

| Topic | Best Practice |
|---|---|
| **Route Interception** | Set up `page.route()` **before** triggering actions like `page.goto()` or clicking buttons that initiate the request. |
| **Response Modification** | Call `await route.fetch()`, modify JSON, and fulfill with `await route.fulfill({ response, json: modifiedBody })`. |
| **Async Handling** | Always `await` calls to `route.fetch()`, `response.json()`, and `route.fulfill()`. |
| **Data Types** | Use `Record<string, any>` for single objects and `Record<string, any>[]` for arrays. |
| **Assertions** | Always use web-first assertions (e.g., `await expect(locator).toBeVisible()`) to ensure asynchronous network and render cycles complete. |
