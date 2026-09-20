from flask import Flask, jsonify
from flask_cors import CORS

# Initialize the Flask app
app = Flask(__name__)

# Enable CORS for all routes, allowing our frontend to fetch data
CORS(app)

# Sample course data (in a real application, this would come from a database)
courses_data = [
    {
        "id": 1,
        "title": "Introduction to Python Backend",
        "description": "Learn to build a powerful backend server using Python and Flask.",
        "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDEwfHxweXRob24lMjBjb2Rpbmd8ZW58MHx8fHwxNzI3MzgwMTM3fDA&ixlib=rb-4.0.3&q=80&w=400",
        "progress": 75
    },
    {
        "id": 2,
        "title": "Advanced CSS and Sass",
        "description": "Master responsive design, animations, and CSS pre-processors.",
        "image": "https://images.unsplash.com/photo-1507721999472-8ed4421b436a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDF8fGNzc3xlbnwwfHx8fDE3MjczNzYyNTB8MA&ixlib=rb-4.0.3&q=80&w=400",
        "progress": 35
    },
    {
        "id": 3,
        "title": "JavaScript: The Hard Parts",
        "description": "Deep dive into closures, prototypal inheritance, and async JS.",
        "image": "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDF8fGphdmFzY3JpcHR8ZW58MHx8fHwxNzI3Mzc2MjUzfDA&ixlib=rb-4.0.3&q=80&w=400",
        "progress": 85
    }
]

# Define the API route for courses
@app.route('/api/courses', methods=['GET'])
def get_courses():
    """This function runs when a GET request is made to /api/courses."""
    return jsonify(courses_data)

# This allows the script to be run directly
if __name__ == '__main__':
    # Runs the Flask app on http://127.0.0.1:5000
    # debug=True enables auto-reloading when you save the file
    app.run(debug=True, port=5000)