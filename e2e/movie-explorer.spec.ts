import { test, expect } from '@playwright/test'

test.describe('Movie Explorer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for the initial results to load
    await page.waitForResponse(
      response => response.url().includes('omdbapi') && response.status() === 200
    )
    // Wait for the table to be visible
    await expect(page.getByTestId('movie-table')).toBeVisible()
  })

  test('should show initial search results', async ({ page }) => {
    // Verify that the search input has the default value
    await expect(page.getByTestId('movie-search-input')).toHaveValue('Pokemon')
  })

  test('should search for movies and display results', async ({ page }) => {
    // Type into search input
    await page.getByTestId('movie-search-input').clear()
    await page.getByTestId('movie-search-input').fill('Batman')

    // Wait for the results to load
    await page.waitForResponse(
      response => response.url().includes('omdbapi') && response.status() === 200
    )

    // Wait for at least one Batman movie to appear
    await expect(
      page
        .locator('[data-testid^="movie-row-"]')
        .filter({ hasText: /Batman/i })
        .first()
    ).toBeVisible()
  })
})
