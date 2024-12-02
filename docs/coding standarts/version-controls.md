# **Version Control Practices**

### **3.1 Repository Structure**

* **Monorepo vs. Multi-repo:**
  * For  **FocusFlow** , use a **monorepo** approach, keeping both frontend and backend code in a single repository for easier management and integration.
* **Directory Layout:**
  * Organize the repository with clear directories for frontend and backend.
  * Example:`focusflow/ ├── frontend/ │ ├── src/ │ ├── public/ │ └── package.json ├── backend/ │ ├── src/ │ └── package.json ├── .gitignore ├── README.md └── LICENSE`

### **3.2 Commit Message Guidelines**

Adhere to a clear and consistent commit message format to improve readability and traceability.

### **3.2.1 Format**

* **Header:**
  * **Structure:** `<type>(<scope>): <short summary>`
  * **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
  * **Scope:** Optional; indicates the section of the codebase affected.
  * **Example:** `feat(pomodoro): add start and pause functionality`
* **Body:**
  * Provide a detailed description of the changes.
  * Explain the **what** and  **why** , not the  **how** .
  * Wrap lines at  **72 characters** .
* **Footer:**
  * Include references to issues or pull requests.
  * Example: `Closes #45`

### **3.2.2 Examples**

* **Adding a Feature:** `feat(todo): add ability to filter tasks by status Implemented filtering functionality to allow users to view all, completed, or incomplete tasks. Added corresponding UI components and backend support. Closes #12`
* **Fixing a Bug:** `fix(timer): correct countdown logic when pausing and resuming Fixed an issue where the Pomodoro timer did not accurately resume after being paused. Adjusted the countdown calculations and added additional state management. Closes #23`
* **Updating Documentation:** `docs(README): update setup instructions for new developers Revised the README to include detailed setup instructions, environment variable configurations, and troubleshooting tips to assist new developers in onboarding.`

### **3.3 Pull Request Guidelines**

Ensure that all code changes are reviewed and approved before merging into the main branch.

### **3.3.1 Pull Request Process**

1. **Create a Branch:**
   * Branch from the `develop` branch following the naming conventions.
2. **Develop on the Feature Branch:**
   * Implement the feature or fix.
   * Commit changes with clear commit messages.
3. **Open a Pull Request (PR):**
   * Target the `develop` branch.
   * Provide a descriptive title and detailed description.
   * Link related issues using keywords (e.g., `Closes #45`).
4. **Review Process:**
   * At least one team member reviews the PR.
   * Conduct code reviews focusing on code quality, adherence to standards, and functionality.
   * Request changes if necessary.
5. **Approval and Merge:**
   * Once approved, merge the PR into `develop`.
   * Use **squash and merge** or **rebase and merge** to maintain a clean commit history.
6. **Post-Merge Actions:**
   * Delete the feature branch to keep the repository clean.
   * Ensure that CI/CD pipelines run successfully after merging.
