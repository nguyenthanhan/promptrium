#!/usr/bin/env node

/**
 * Extract changelog content for a specific version
 * Usage: node scripts/extract-changelog.js <version>
 * Example: node scripts/extract-changelog.js 1.0.0
 */

const fs = require("fs");
const path = require("path");

function extractChangelog(version) {
  try {
    const changelogPath = path.join(process.cwd(), "CHANGELOG.md");

    if (!fs.existsSync(changelogPath)) {
      console.error("CHANGELOG.md not found");
      process.exit(1);
    }

    const changelog = fs.readFileSync(changelogPath, "utf8");

    // Remove the 'v' prefix if present
    const cleanVersion = version.replace(/^v/, "");

    // Find the section for this version including the header
    // This regex looks for ## [version] with optional date followed by content until next ## or ---
    const versionPattern = new RegExp(
      `(^## \\[${cleanVersion.replace(
        /\./g,
        "\\."
      )}\\])(?: - \\d{4}-\\d{2}-\\d{2})?\\n[\\s\\S]*?)(?=\\n## |\\n---|$)`,
      "im"
    );

    const match = changelog.match(versionPattern);

    if (match) {
      const header = match[1];
      const content = match[2];

      // Clean up the content - remove extra blank lines and normalize spacing
      const cleanedContent = content
        .replace(/\n\s*\n\s*\n/g, "\n\n") // Replace multiple blank lines with double newlines
        .replace(/\n{3,}/g, "\n\n") // Ensure no more than 2 consecutive newlines
        .trim();

      // Combine header and cleaned content
      const fullContent = `${header}\n\n${cleanedContent}`;

      console.log(fullContent);
      return fullContent;
    } else {
      console.error(`No changelog content found for version ${cleanVersion}`);
      console.log("Available versions:");

      // Extract all version headers
      const versionHeaders = changelog.match(/## \[([^\]]+)\]/g);
      if (versionHeaders) {
        versionHeaders.forEach((header) => {
          const version = header.replace(/## \[|\]/g, "");
          console.log(`  - ${version}`);
        });
      }

      process.exit(1);
    }
  } catch (error) {
    console.error("Error extracting changelog:", error.message);
    process.exit(1);
  }
}

// Get version from command line arguments
const version = process.argv[2];

if (!version) {
  console.error("Usage: node scripts/extract-changelog.js <version>");
  console.error("Example: node scripts/extract-changelog.js 1.0.0");
  process.exit(1);
}

// Fast-fail check: verify the requested version exists in CHANGELOG.md
try {
  const changelogPath = path.join(process.cwd(), "CHANGELOG.md");

  if (!fs.existsSync(changelogPath)) {
    console.error("Error: CHANGELOG.md not found");
    process.exit(1);
  }

  const changelog = fs.readFileSync(changelogPath, "utf8");
  const cleanVersion = version.replace(/^v/, "");
  const versionHeaderPattern = new RegExp(
    `^## \\[${cleanVersion.replace(/\./g, "\\.")}\\]`,
    "m"
  );

  if (!versionHeaderPattern.test(changelog)) {
    console.error(`Error: version '${cleanVersion}' not found in CHANGELOG.md`);
    process.exit(1);
  }
} catch (error) {
  console.error("Error checking CHANGELOG.md:", error.message);
  process.exit(1);
}

extractChangelog(version);
