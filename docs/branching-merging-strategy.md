# **Branching and Merging Strategy**


### **4.1 Branch Types**

Adopt a standardized branching model to manage development workflows effectively.

* **Main Branches:**
  * `main`: Production-ready code. This branch reflects the live application.
  * `develop`: Integration branch for features. All completed features are merged here before release.
* **Supporting Branches:**
  * **Feature Branches** : For developing new features.
  * **Naming Convention:** `feature/<feature-name>`
  * **Example:** `feature/todo-filter`
  * **Bugfix Branches** : For fixing bugs.
  * **Naming Convention:** `bugfix/<bug-description>`
  * **Example:** `bugfix/timer-resume-issue`
  * **Hotfix Branches** : For urgent fixes in production.
  * **Naming Convention:** `hotfix/<hotfix-description>`
  * **Example:** `hotfix/login-crash`
  * **Release Branches** : For preparing a new production release.
  * **Naming Convention:** `release/<version-number>`
  * **Example:** `release/1.0.0`

### Steps to create new branch and push

Create and switch to the new branch

```jsx
git checkout -b feature/...
```

Add your changes

```jsx
git add .
```

Commit your changes

```jsx
git commit -m ""
```

Push to remote with upstream tracking

```jsx
git push --set-upstream origin feature/...
```

### **4.2 Branch Naming Conventions**

Maintain clarity and consistency in branch names to facilitate easy identification and management.

* **Feature Branches:** `feature/<feature-name>`
  * Example: `feature/pomodoro-customization`
* **Bugfix Branches:** `bugfix/<bug-description>`
  * Example: `bugfix/api-response-time`
* **Hotfix Branches:** `hotfix/<hotfix-description>`
  * Example: `hotfix/user-authentication`
* **Release Branches:** `release/<version-number>`
  * Example: `release/1.0.0`

**Guidelines:**

* Use lowercase letters and hyphens to separate words.
* Keep branch names concise yet descriptive.
* Avoid using spaces, special characters, or uppercase letters.

### **4.3 Merging Protocols**

Establish clear protocols for merging branches to maintain code integrity and streamline collaboration.

### **4.3.1 Feature Branch Merging**

1. **Completion:**
   * Once a feature is complete and tested locally, open a Pull Request (PR) to merge into `develop`.
2. **Code Review:**
   * At least one team member reviews the PR.
   * Address any feedback or requested changes.
3. **Merge:**
   * After approval, merge the feature branch into `develop` using **squash and merge** to combine commits into a single, clean commit.
4. **Delete Branch:**
   * Delete the feature branch post-merge to keep the repository clean.

### **4.3.2 Bugfix Branch Merging**

1. **Completion:**
   * After fixing the bug and testing, open a PR to merge into `develop`.
2. **Code Review:**
   * Team members review the changes for correctness and adherence to standards.
3. **Merge:**
   * Merge the bugfix branch into `develop` using  **squash and merge** .
4. **Delete Branch:**
   * Remove the bugfix branch after merging.

### **4.3.3 Hotfix Branch Merging**

1. **Urgency:**
   * Hotfixes address critical issues in the production environment.
2. **Merge into Main:**
   * Open a PR to merge the hotfix branch directly into `main`.
3. **Code Review:**
   * Conduct a swift code review to ensure the fix is appropriate and does not introduce new issues.
4. **Merge:**
   * Use **merge commit** to preserve the history.
5. **Back-Merge into Develop:**
   * Additionally, merge the hotfix into `develop` to ensure the fix is included in future releases.
6. **Delete Branch:**
   * Delete the hotfix branch post-merge.

### **4.3.4 Release Branch Merging**

1. **Preparation:**
   * When `develop` has accumulated enough features for a release, create a `release` branch.
2. **Stabilization:**
   * Perform final testing, bug fixing, and documentation updates on the release branch.
3. **Code Review:**
   * Review the release branch to ensure readiness for production.
4. **Merge into Main and Develop:**
   * Merge the release branch into `main` using a  **merge commit** .
   * Tag the release with a version number.
   * Also, merge the release branch back into `develop` to incorporate any final changes.
5. **Delete Branch:**
   * Remove the release branch after merging.

### **4.4 Conflict Resolution**

Effective strategies to handle merge conflicts ensure smooth integration of code changes.

* **Early Integration:**
  * Frequently merge `develop` into feature branches to minimize large divergences.
* **Communication:**
  * Encourage team members to communicate about overlapping work to anticipate conflicts.
* **Conflict Resolution Steps:**
  1. **Identify the Conflict:**
     * Git will highlight the files and sections with conflicts during merging.
  2. **Review Conflicting Changes:**
     * Understand the intent behind each conflicting change.
  3. **Resolve the Conflict:**
     * Decide which changes to keep, modify, or discard.
     * Edit the affected files to resolve conflicts manually.
  4. **Mark as Resolved:**
     * After resolving, mark the conflicts as resolved using Git commands.
  5. **Test Thoroughly:**
     * Ensure that the resolved code works as intended.
  6. **Commit the Merge:**
     * Finalize the merge after resolving conflicts.
* **Use Tools:**
  * Utilize Git's built-in merge tools or third-party tools like  **VS Code's merge editor** ,  **Meld** , or **KDiff3** for visual conflict resolution.

**Set Up Branch Protection Rules**

* Go to your Git hosting service (e.g., GitHub).
* Navigate to the repository settings >  **Branches** .
* Add rules for `main` and `develop`:
  * Require pull request reviews before merging.
  * Require status checks to pass before merging (CI/CD pipeline once configured).
  * Prevent force pushes and deletions.
