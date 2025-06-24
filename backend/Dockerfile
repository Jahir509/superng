FROM python:3.12-slim

# Set the working directory
WORKDIR /app/superng

# Copy requirements.txt
COPY requirements.txt .
# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt
# Copy the rest of the application code
COPY . .
# Expose the port the app runs on
EXPOSE 8000

# Start the application
CMD ["sh", "-c", "python manage.py migrate && python manage.py seed_users && python manage.py runserver 0.0.0.0:8000"]
