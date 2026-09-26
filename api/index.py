import os
import psycopg2
from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# -----------------------------------------------------------
# Database Connection Helper (This fixes your Pylance error!)
# -----------------------------------------------------------
def get_db_connection():
    return psycopg2.connect(os.environ.get("DATABASE_URL"))

# -----------------------------------------------------------
# API Routes
# -----------------------------------------------------------

@app.route('/api/health', methods=['GET'])
def health_check():
    """Simple endpoint to verify the backend is running."""
    return jsonify({"status": "online", "message": "S.A.B.Z. Backend is Running!"})


@app.route('/api/log-waste', methods=['POST'])
def log_waste():
    """Receives waste data from the frontend/QR scanner and awards credits."""
    data = request.json
    user_id = data.get('user_id')
    weight_kg = data.get('weight_kg')
    hub_id = data.get('hub_id', 'Unknown')
    
    # Business Logic: 1kg of organic waste + sawdust = 50 S.A.B.Z. Credits
    credits_earned = float(weight_kg) * 50 

    conn = get_db_connection()
    cur = conn.cursor()
    try:
        # 1. Log the transaction
        cur.execute(
            "INSERT INTO Waste_Logs (user_id, weight_kg, hub_id) VALUES (%s, %s, %s)", 
            (user_id, weight_kg, hub_id)
        )
        # 2. Add credits to user
        cur.execute(
            "UPDATE Users SET total_green_credits = total_green_credits + %s WHERE id = %s", 
            (credits_earned, user_id)
        )
        conn.commit()
        return jsonify({
            "status": "success", 
            "weight_logged": weight_kg,
            "credits_earned": credits_earned
        })
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()


@app.route('/api/admin-stats', methods=['GET'])
def get_admin_stats():
    """Secured endpoint that aggregates city-wide waste data."""
    # Security Check: Verify the secret header
    provided_key = request.headers.get('X-Admin-Key')
    if provided_key != os.environ.get('ADMIN_SECRET_KEY'):
        abort(403, description="Unauthorized access")
        
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT SUM(weight_kg) FROM Waste_Logs")
        total_waste = cur.fetchone()[0] or 0
        
        cur.execute("SELECT SUM(total_green_credits) FROM Users")
        total_credits = cur.fetchone()[0] or 0
        
        cur.execute("SELECT COUNT(id) FROM Users")
        total_users = cur.fetchone()[0] or 0
        
        return jsonify({
            "total_waste_kg": float(total_waste),
            "total_credits_issued": float(total_credits),
            "active_users": total_users
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()

from werkzeug.security import generate_password_hash, check_password_hash

@app.route('/api/signup', methods=['POST'])
def signup():
    """Creates a new user with a securely hashed password."""
    data = request.json
    username = data.get('email')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({"error": "Missing credentials"}), 400
        
    hashed_password = generate_password_hash(password)
    
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute(
            "INSERT INTO Users (username, password_hash) VALUES (%s, %s) RETURNING id", 
            (username, hashed_password)
        )
        user_id = cur.fetchone()[0]
        conn.commit()
        return jsonify({"status": "success", "user_id": user_id})
    except psycopg2.errors.UniqueViolation:
        conn.rollback()
        return jsonify({"error": "Email already registered"}), 409
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()

@app.route('/api/login', methods=['POST'])
def login():
    """Verifies user credentials against the database."""
    data = request.json
    username = data.get('email')
    password = data.get('password')
    
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT id, password_hash FROM Users WHERE username = %s", (username,))
        user = cur.fetchone()
        
        # Verify the hash matches the provided password
        if user and check_password_hash(user[1], password):
            return jsonify({"status": "success", "user_id": user[0]})
        else:
            return jsonify({"error": "Invalid email or password"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()

@app.route('/api/admin-login', methods=['POST'])
def admin_login():
    """Validates the secret key against the .env file."""
    data = request.json
    secret_key = data.get('secret_key')
    
    if secret_key == os.environ.get('ADMIN_SECRET_KEY'):
        return jsonify({"status": "success"})
    else:
        return jsonify({"error": "Unauthorized Access"}), 403

if __name__ == '__main__':
    app.run(debug=True, port=5000)