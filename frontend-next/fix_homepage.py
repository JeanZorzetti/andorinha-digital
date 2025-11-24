import os

# Paths
backup_path = r"src/components/HomePage.backup.tsx"
target_path = r"src/components/HomePage.tsx"

# Read backup file
with open(backup_path, "r", encoding="utf-8") as f:
    content = f.read()

# Apply fixes
# 1. Fix malformed closing tags
content = content.replace("</section >", "</section>")
content = content.replace("</main >", "</main>")

# 2. Fix malformed opening tags (remove spaces after <)
content = content.replace("< section", "<section")

# 3. Uncomment Particles
content = content.replace("{/* <Particles", "<Particles")
content = content.replace("/> */}", "/>")
# Also handle the case where it might be formatted differently
content = content.replace("          {/* <Particles", "          <Particles")
content = content.replace("          /> */}", "          />")

# 4. Update Marketing to Audiovisual in the form label
content = content.replace("Aceito receber contato da Andorinha Marketing *", "Aceito receber contato da Andorinha Audiovisual *")

# 5. Rewrite the return statement start to ensure no hidden characters (optional but safe)
# We can't easily regex replace this without risk, but the malformed tags were likely the main issue.
# If the return statement still fails, we'll address it later.

# Write to target file
with open(target_path, "w", encoding="utf-8") as f:
    f.write(content)

print("HomePage.tsx has been fixed and written.")
