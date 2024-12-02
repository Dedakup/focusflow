# Versioning

## **Why Versioning an MVP is Important**

1. **Track Progress**:
   - Helps keep a record of iterations as you refine the MVP.
2. **Rollbacks**:
   - Provides a safety net to revert to a previous working version if something breaks.
3. **Clarity in Collaboration**:
   - Team members can align on specific versions of the app.
4. **Deployment Management**:
   - Identifies what is deployed in different environments (e.g., staging, production).
5. **Feedback Cycles**:
   - Ties user feedback to a specific version, making debugging and improvements easier.

---

## **How to Version Your MVP**

### **1. Use Semantic Versioning (SemVer)**

Semantic versioning provides a clear and standardized way to version your app. It uses the format:

```plaintext
MAJOR.MINOR.PATCH
```

#### **What Each Part Means:**

1. **MAJOR**: Increment when you make breaking changes.
   - Example: Changing the API structure or completely redesigning the app.
2. **MINOR**: Increment when you add new features or significant improvements.
   - Example: Adding a new page or feature to your MVP.
3. **PATCH**: Increment for bug fixes or small improvements.
   - Example: Fixing typos, UI glitches, or minor backend issues.

#### **Example Version Progression:**

- `0.1.0`: Initial MVP release.
- `0.2.0`: Added a new feature (e.g., user authentication).
- `0.2.1`: Fixed a bug in user login.

During MVP development, you’ll likely stick to `0.x.x` versions since the app is still in early stages.

---

### **2. Use Git Tags for Versioning**

In Git, you can create **tags** to mark specific commits as versioned releases.

#### **How to Tag a Version in Git**:

1. Commit your changes:

   ```bash
   git add .
   git commit -m "Add feature X"
   ```

2. Tag the version:

   ```bash
   git tag v0.1.0
   ```

3. Push the tags to your remote repository:

   ```bash
   git push origin v0.1.0
   ```

#### **Viewing All Tags**:

```bash
git tag
```

#### **Annotate Tags for Additional Context**:

You can add annotations to explain the purpose of the version:
```bash
git tag -a v0.1.0 -m "Initial MVP release with login and dashboard features"
git push origin v0.1.0
```

---

### **3. Automate Versioning with Tools**

If you want to automate version management, use tools like:
- **Semantic Release**: Automatically determines the next version based on commit messages.
- **npm Versioning**: If you’re building an npm-based app, use `npm version`:
  ```bash
  npm version minor
  ```

---

### **4. Maintain a CHANGELOG**

Document changes in a `CHANGELOG.md` file to provide a clear history of updates. Use this format:
```markdown
# Changelog

## [0.2.0] - 2024-12-01
### Added
- User authentication feature.

### Fixed
- Dashboard loading issue.

## [0.1.0] - 2024-11-15
### Initial Release
- Basic MVP with homepage and dashboard.
```

---

### **5. Consider Pre-Release Tags**

If the MVP isn’t ready for production but has testable versions, use **pre-release tags**:
- Examples: `0.1.0-alpha`, `0.1.0-beta`.
- **Alpha**: Early, unstable versions for internal testing.
- **Beta**: More stable but still in testing phase.

#### **How to Tag a Pre-Release Version in Git**:

```bash
git tag v0.1.0-alpha
git push origin v0.1.0-alpha
```

---

### **6. Version APIs Separately**

If your MVP includes a backend API, consider versioning it independently using URL-based versioning:
- Example: `https://api.example.com/v1/`

---

## **Best Practices for Versioning an MVP**

1. **Start with `0.x.x`**:
   - Use `0.x.x` until the MVP is production-ready. Move to `1.0.0` for the official launch.
2. **Use Tags for Milestones**:
   - Tag significant milestones like feature additions or major bug fixes.
3. **Automate Where Possible**:
   - Use CI/CD tools (e.g., GitHub Actions, GitLab CI) to automatically tag versions during deployments.
4. **Document Changes**:
   - Keep a `CHANGELOG.md` to track changes across versions.

---

### **Example Workflow**

1. Start your MVP at version `0.1.0`.
2. Commit changes and increment versions as you add features or fix bugs:
   - Add a new feature: `git tag v0.2.0`.
   - Fix a bug: `git tag v0.2.1`.
3. Push tags to the remote repository for reference.
4. Update the `CHANGELOG.md` file with the details of each version.

---

Let me know if you’d like help setting up versioning or automating this process for your MVP!