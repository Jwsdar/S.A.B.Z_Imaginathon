import pytest
from app import app
from unittest.mock import MagicMock, patch

@pytest.fixture
def client():
    """Sets up a test client for the Flask app"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_health_check(client):
    """Ensure API is awake and responding."""
    response = client.get('/api/health')
    assert response.status_code == 200
    assert response.json['status'] == 'online'

@patch('app.get_db_connection')
def test_log_waste_calculation(mock_db_connection, client):
    """Test that the 1kg = 50 credits business logic works without hitting the live DB."""

    #1. Set up the fake DB cursor
    mock_conn = MagicMock()
    mock_cursor = MagicMock()
    mock_conn.cursor.return_value = mock_cursor
    mock_db_connection.return_value = mock_conn

    #2. Send the fake HW data to the API
    payload = {
        "user_id": 1,
        "weight_kg": 2.5,
        "hub_id": "CH-04"
    }
    response = client.post('/api/log-waste', json=payload)

    #3. Verify the response and the math
    assert response.status_code == 200
    assert response.json['status'] == 'success'
    assert response.json['credits_earned'] == 125.0

    #4. Verify the DB was instructed to do the right thing
    assert mock_cursor.execute.call_count == 2
    mock_conn.commit.assert_called_once()