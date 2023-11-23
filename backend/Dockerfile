FROM python:3.11-alpine

WORKDIR /backend

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD python app.py
