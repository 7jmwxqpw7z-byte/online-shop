# online-shop


## Project Overview
This is a **Playwright-based end-to-end test automation** project for an online shop (fakestore.testelka.pl). The codebase follows the **Page Object Model (POM)** pattern with page features organized in `src/pages/features/`.

## Architecture & Key Patterns

### Page Object Model Structure
- **Location**: `src/pages/features/`
- **Pattern**: Each page feature has a dedicated class with a private constructor and static `of()` factory method
- **Example**: See [my-account-page.ts](src/pages/features/my-account-page/my-account-page.ts) - creates instances via `MyAccountPage.of(locator)`
- **XPath Selectors**: All locators use XPath (e.g., `//input[@type='email']`, `//button[@name='register']`)
- **Locator Scoping**: Page objects accept a root `Locator` to scope all child selectors, enabling component isolation

### Test Structure
- **Location**: `tests/` directory
- **Framework**: Playwright (@playwright/test v1.57.0)
- **Pattern**: Tests use `test.step()` for organizing workflow steps (see [scenario-1_User_Registration.spec.ts](tests/scenario-1_User_Registration.spec.ts))
- **Page Object Usage**: Import and instantiate page objects with `LocatorComponent.of(page.locator(scopeSelector))`
- **Assertions**: Use Playwright's `expect()` for visibility and content validation

### Key Conventions
1. **Factory Pattern Over Constructors**: Always use `PageClass.of(locator)` to instantiate page objects
2. **Async/Await**: All page methods are async (e.g., `fillRegistrationForm()`, `navigateToMyAccountPage()`)
3. **Exported Page Features**: Add new page features to [src/pages/features/index.ts](src/pages/features/index.ts) barrel export
4. **Method Naming**: Helper methods are private; public methods describe user actions (fill, navigate, verify)
5. **Multi-step Workflows**: Group related actions into higher-level methods (e.g., `fillRegistrationForm()` calls three smaller methods)

## Common Development Tasks

### Adding a New Page Feature
1. Create folder: `src/pages/features/my-new-page/`
2. Create `my-new-page.ts` with static `of()` factory and async action methods
3. Create `index.ts` barrel export: `export * from './my-new-page';`
4. Add export to [src/pages/features/index.ts](src/pages/features/index.ts)

### Writing Tests
- Import page objects from `src/pages/features`
- Use `test.step()` to organize logical workflow steps
- Initialize pages with `PageClass.of(page.locator('XPathToRoot'))`
- Call page methods to perform actions and assertions

### Running Tests
- **All tests**: `npx playwright test`
- **Specific file**: `npx playwright test tests/scenario-1_User_Registration.spec.ts`
- **Single browser**: `npx playwright test --project=chromium`
- **View results**: `npx playwright show-report`

## External Dependency: Playwright Config
- **File**: [playwright.config.ts](playwright.config.ts)
- **Key Settings**: 
  - Test directory: `./tests`
  - Parallel execution: enabled (can be disabled in CI via workers setting)
  - HTML reporter enabled
  - Trace collection on first retry
  - Tests run on Chromium, Firefox, WebKit by default

## Project State & Known Issues
- **Package Scripts**: None defined in package.json (npx commands required)
- **Environment Variables**: dotenv import commented out in config (not currently used)
- **baseURL**: Commented in config; tests specify full URLs (e.g., `https://fakestore.testelka.pl/`)
- **UI Controls**: `src/pages/ui-controls/` folder exists but is empty (will be filled in next parts of implementing)
