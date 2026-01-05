import os, json, base64, hashlib, sys

# Uso:
#   python restaurar_fs_desde_json_roomai.py RoomAI_App_Completa_expanded_filesystem.json ./salida

in_json = sys.argv[1]
out_root = sys.argv[2] if len(sys.argv) > 2 else "restaurado"

with open(in_json, "r", encoding="utf-8") as f:
    bundle = json.load(f)

os.makedirs(out_root, exist_ok=True)

for e in bundle["entries"]:
    path = e["path"].lstrip("/")
    fs_path = os.path.join(out_root, *path.split("/")) if path else out_root

    if e["type"] == "directory":
        os.makedirs(fs_path, exist_ok=True)
    elif e["type"] == "file":
        raw = base64.b64decode(e["data"])
        if hashlib.sha256(raw).hexdigest() != e["sha256"]:
            raise SystemExit(f"SHA256 no coincide: {e['path']}")
        os.makedirs(os.path.dirname(fs_path), exist_ok=True)
        with open(fs_path, "wb") as out:
            out.write(raw)

print("Restaurado en:", out_root)
