"""
Generate secured, watermarked PDFs from the Care2Data brochure HTML files.
- Edge headless renders each HTML → temp PDF
- reportlab stamps a diagonal grayscale CARE2DATA watermark on every page
- pypdf encrypts with print-only restrictions (no text copy)
"""

import os, subprocess, sys, time
from io import BytesIO
from pypdf import PdfWriter, PdfReader
from pypdf.constants import UserAccessPermissions
from reportlab.pdfgen import canvas
from reportlab.lib.colors import Color

EDGE     = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
ASSETS   = r"D:\Care2data-Website-V4\public\assets"
OWNER_PW = "C2D@Secure2025!"   # restricts permissions; end-user opens without password

BROCHURES = [
    ("brochure.html",            "brochure.pdf"),
    ("engagement-brochure.html", "engagement-brochure.pdf"),
    ("kwalify-brochure.html",    "kwalify-brochure.pdf"),
    ("trialgen-brochure.html",   "trialgen-brochure.pdf"),
]

# Print only; no extract/copy, no modify, no annotations
PERMISSIONS = UserAccessPermissions.PRINT


def make_watermark(width, height):
    buf = BytesIO()
    c = canvas.Canvas(buf, pagesize=(width, height))
    c.saveState()
    c.translate(width / 2, height / 2)
    c.rotate(45)
    c.setFont("Helvetica-Bold", 72)
    c.setFillColor(Color(0, 0, 0, alpha=0.08))   # near-transparent gray
    c.drawCentredString(0, 0, "CARE2DATA")
    c.restoreState()
    c.save()
    buf.seek(0)
    return PdfReader(buf).pages[0]


def html_to_pdf(html_path, tmp_path):
    url = "file:///" + html_path.replace("\\", "/")
    subprocess.run(
        [EDGE, "--headless", "--disable-gpu",
         "--run-all-compositor-stages-before-draw",
         f"--print-to-pdf={tmp_path}", url],
        capture_output=True, timeout=45
    )
    # Edge sometimes needs a moment to flush
    for _ in range(10):
        if os.path.exists(tmp_path) and os.path.getsize(tmp_path) > 1024:
            return True
        time.sleep(0.5)
    return False


def add_watermark_and_secure(src, dst):
    reader = PdfReader(src)
    writer = PdfWriter()

    for page in reader.pages:
        w = float(page.mediabox.width)
        h = float(page.mediabox.height)
        page.merge_page(make_watermark(w, h))
        writer.add_page(page)

    writer.encrypt(
        user_password="",
        owner_password=OWNER_PW,
        algorithm="AES-256",
        permissions_flag=PERMISSIONS,
    )

    with open(dst, "wb") as f:
        writer.write(f)


def main():
    for html_file, pdf_file in BROCHURES:
        html_path = os.path.join(ASSETS, html_file)
        tmp_path  = os.path.join(ASSETS, f"_tmp_{pdf_file}")
        out_path  = os.path.join(ASSETS, pdf_file)

        print(f"\n> {html_file}")

        if not os.path.exists(html_path):
            print(f"  SKIP - file not found")
            continue

        print(f"  Rendering HTML to PDF via Edge ...")
        ok = html_to_pdf(html_path, tmp_path)
        if not ok:
            print(f"  ERROR - Edge did not produce a PDF")
            continue

        print(f"  Adding watermark + security ...")
        add_watermark_and_secure(tmp_path, out_path)
        os.remove(tmp_path)

        size_kb = os.path.getsize(out_path) // 1024
        print(f"  OK {pdf_file}  ({size_kb} KB)")

    print("\nAll done.")


if __name__ == "__main__":
    main()
