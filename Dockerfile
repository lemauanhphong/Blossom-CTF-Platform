FROM python:3.11-alpine

WORKDIR /backend

COPY ./backend/requirements.txt .
RUN pip install -r requirements.txt

COPY ./backend .

CMD python app.py
