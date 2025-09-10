# Tips & Snippets

Short, copyable snippets for daily work.

=== "Bash"
```bash
# Find large files
find . -type f -size +50M -print0 | xargs -0 ls -lh
```

=== "Git"
```bash
# Amend last commit message
git commit --amend -m "Better message"
```
