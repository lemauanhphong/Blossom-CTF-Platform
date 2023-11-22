FROM python:3.11-alpine

WORKDIR /src

COPY ./src/requirements.txt .
RUN pip install -r requirements.txt

COPY ./src .

CMD python app.py
