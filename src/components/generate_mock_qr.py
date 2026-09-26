import qrcode
import json

# The placebo payload representing a 4kg organic waste scan
payload_data = {
    "system": "SABZ",
    "hub_id": "demo_hub_01",
    "waste_type": "organic",
    "weight_kg": 4.0,
    "credits_earned": 120
}

# Convert the dictionary to a JSON string
payload_string = json.dumps(payload_data)

# Configure the QR code sizing and styling
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)

qr.add_data(payload_string)
qr.make(fit=True)

# Generate the image using S.A.B.Z. dark theme colors
img = qr.make_image(
    fill_color="#1a1f18", 
    back_color="#ffffff"
)

# Save the file to your directory
filename = "placebo_4kg_organic.png"
img.save(filename)

print(f"✅ Placebo QR code successfully generated and saved as {filename}")
print(f"Payload encoded: {payload_string}")